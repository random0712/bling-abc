import { Component, Input, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { IItemData } from 'src/app/services/shared/shared.model';

@Component({
  selector: 'app-product-row',
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.scss']
})
export class ProductRowComponent implements OnInit {
  @Input() productData: IItemData;
  @Input() position: number;
  @Input() highlightInfo: string;

  imageSource: string;
  isOutOfStock: boolean = false;
  hasLowStock: boolean = false;
  hasHighStock: boolean = false;
  lowSales: boolean = false;
  constructor() { }

  ngOnInit(): void {
    const currentProduct = this.productData.product?.produto;
    const stock = currentProduct?.estoqueAtual || 0;
    this.imageSource = currentProduct?.imagem[0]?.link || '';
    this.isOutOfStock = stock <= 0;
    this.hasLowStock = !this.isOutOfStock && stock < 10;
    this.hasHighStock = stock >= 50;
    this.lowSales = this.calculeLowSales();
  }

  private calculeLowSales(): boolean {
    const { lastOrderDate } = this.productData;
    const now = dayjs();
    const oneWeeksBeforeDate = now.subtract(7, 'day');
    if(lastOrderDate === oneWeeksBeforeDate.format('DD/MM/YYYY') || this.isOutOfStock) {
      return false;
    }

    return dayjs(lastOrderDate).isBefore(oneWeeksBeforeDate, 'day');
  }

}
