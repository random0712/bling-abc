import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import { expand, of, retry } from 'rxjs';
import { IOrderRange } from './components/header/header.model';
import { LoadingDialogComponent } from './components/molecules/loading-dialog/loading-dialog.component';
import { IOrder, IOrderItem } from './services/bling/order/order.model';
import { OrderService } from './services/bling/order/order.service';
import { IProduct } from './services/bling/product/product.model';
import { ProductService } from './services/bling/product/product.service';
import { IBlingSituation } from './services/bling/situation/situation.model';
import { SituationService } from './services/bling/situation/situation.service';
import { IItemData, IQuantityListItem } from './services/shared/shared.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'curva-abc';

  orders: IOrder[] = [];
  products: IProduct[] = [];
  dialogRef: MatDialogRef<LoadingDialogComponent, any>;

  orderSituations: IBlingSituation[] = [];
  isLoadingOrders: boolean = true;
  totalProductsSales: number = 0;

  analysisData: IItemData[] = [];

  constructor(
    private orderService: OrderService,
    private situationService: SituationService,
    private productService: ProductService,
    private dialog: MatDialog 
  ) { }

  ngOnInit(): void {
    this.situationService.getSituations('Vendas').subscribe(situationsResponse => {
      this.orderSituations = situationsResponse.retorno.situacoes
    })
  } 

  public onNewRange(newRange: IOrderRange) {
    this.loadOrders(newRange)
  }

  private loadOrders(range: IOrderRange) {
    this.dialogRef = this.dialog.open(LoadingDialogComponent, {width: '300px', height: '300px'});
    const filters = {
      emissionDate: range
    }

    let ordersBuffer: IOrder[] = [];
    this.orderService.getOrdersByPage(1, filters).pipe(
      retry(10),
      expand((val, index) => {
        if(val.retorno.pedidos) {
          return this.orderService.getOrdersByPage(index+2, filters).pipe(
            retry(10)
          );
        }
        return of();
      })
    ).subscribe(res => {
      if(res.retorno.pedidos) {
        ordersBuffer = ordersBuffer.concat(res.retorno.pedidos)
      }

      if(!res.retorno.pedidos) {
        this.orders = ordersBuffer;
        this.loadProducts()
      }
    });
  }

  private loadProducts() {
    const successFn = () => {
      this.associate()
      this.dialogRef.close();
      this.isLoadingOrders = false;
    }

    const productsJSON = sessionStorage.getItem('products');
    if(productsJSON) {
      this.products = JSON.parse(productsJSON);
      successFn();
      return;
    }

    let productsBuffer: IProduct[] = [];
    this.productService.getProductsByPage(1).pipe(
      retry(10),
      expand((val, index) => {
        if(val.retorno.produtos) {
          return this.productService.getProductsByPage(index+2).pipe(
            retry(10)
          );
        }
        return of();
      })
    ).subscribe(res => {
      if(res.retorno.produtos) {
        productsBuffer = productsBuffer.concat(res.retorno.produtos)
      }

      if(!res.retorno.produtos) {
        this.products = productsBuffer;
        sessionStorage.setItem('products', JSON.stringify(this.products));
        successFn();
      }
    });
  }

  associate() {
    const calculateOrderItemValue = (quantity: string, unitPrice: string):number => Number(quantity) * Number(unitPrice);
    const result: IQuantityListItem[] = [];
    // TODO: QUANTITY ANALYSIS
    let totalQuantity: number = 0;
    const handleItem = (item: IOrderItem, orderDate: string) => {
      const { codigo: skuCode, quantidade, valorunidade } = item.item;
      const index = result.findIndex(record => record.code === skuCode);
      if(index === -1) {
        result.push({code: skuCode, quantity: Number(quantidade), totalValue: calculateOrderItemValue(quantidade, valorunidade), lastOrderDate: orderDate})
        return;
      } 
      result[index].quantity += Number(quantidade);
      result[index].totalValue += calculateOrderItemValue(quantidade, valorunidade);
      result[index].lastOrderDate = this.getMostRecentDate(dayjs(result[index].lastOrderDate), dayjs(orderDate));
      totalQuantity += Number(quantidade);
    }

    
    this.orders.forEach(order => {
      const { data } = order.pedido;
      order.pedido.itens.forEach(item => handleItem(item, data))
    })
    
    this.totalProductsSales = totalQuantity;

    
    const unprocessedData = result
      .map(item => this.associateOrderItemWithProduct(item))
      .filter(item => item.product?.produto);
    
    const refinedData = this.convertProductsInItemData(this.products, unprocessedData);

    const hasSharedStock = (item: IItemData) => item.product?.produto?.estrutura?.length 
      && item.product?.produto?.estrutura?.length === 1;


    const productsWithSharedStock = refinedData.filter(hasSharedStock);
    const productsWithoutSharedStock = refinedData.filter((item) => !hasSharedStock(item));

    this.analysisData = productsWithoutSharedStock
      .map(item => this.associateItemWithSharedStock(item, productsWithSharedStock))
      .sort((a, b) => b.quantity - a.quantity);
  };


  associateOrderItemWithProduct(listItem: IQuantityListItem): IItemData {
    const { code, quantity, totalValue, lastOrderDate } = listItem;
    const currentProduct = this.products.find(product => product.produto.codigo === code);
    return {
      quantity,
      product: currentProduct,
      totalValue,
      lastOrderDate
    }
  }

  associateItemWithSharedStock(item: IItemData, productsWithSharedStock: IItemData[]) {
    const findAssociatedProduct = (shared: IItemData, itemToAssociate: IItemData): boolean => {
      const associatedCode = (shared.product?.produto?.estrutura || [])[0]?.componente?.codigo;
      const originProductCode = itemToAssociate.product?.produto.codigo;
      return associatedCode === originProductCode;
    }

    const associatedProducts = productsWithSharedStock.filter(shared => findAssociatedProduct(shared, item));

    if(!associatedProducts.length) {
      return item;
    }

    const sumAllAdverts = (previousValue: IItemData, currentValue: IItemData) => ({
      lastOrderDate: this.getMostRecentDate(dayjs(previousValue.lastOrderDate), dayjs(currentValue.lastOrderDate)),
      product: currentValue.product,
      quantity: previousValue.quantity + currentValue.quantity,
      totalValue: previousValue.totalValue + currentValue.totalValue
    })

    const associatedValues = associatedProducts.reduce(sumAllAdverts);
    
    return {
      quantity: item.quantity + associatedValues.quantity,
      lastOrderDate: this.getMostRecentDate(dayjs(item.lastOrderDate), dayjs(associatedValues.lastOrderDate)),
      product: item.product,
      totalValue: item.totalValue + associatedValues.totalValue
    }
  }

  private getMostRecentDate(dateA: dayjs.Dayjs, dateB: dayjs.Dayjs): string { 
    return dateA.isAfter(dateB) 
      ? dateA.format("YYYY-MM-DD") 
      : dateB.format("YYYY-MM-DD");
  }

  private convertProductsInItemData(products: IProduct[], ordersItems: IItemData[]) {
    const convertInItemData = (product: IProduct): IItemData => { 
      const associatedItem: IItemData | undefined = ordersItems.find(item => {
        const { codigo: itemCode } = (item.product as IProduct).produto;
        const { codigo: productCode } = product.produto;
        return itemCode === productCode
      })
      return associatedItem 
        ? associatedItem
        : {lastOrderDate: '', product, quantity: 0, totalValue: 0}
    }

    return products.map(convertInItemData);
  }
}
