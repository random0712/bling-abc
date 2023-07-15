import { Component, Input, OnInit } from '@angular/core';
import { IItemData } from 'src/app/services/shared/shared.model';

@Component({
  selector: 'app-spare-list',
  templateUrl: './spare-list.component.html',
  styleUrls: ['./spare-list.component.scss']
})
export class SpareListComponent implements OnInit {

  @Input() analysisData: IItemData[] = [];
  processedData: IItemData[] = [];

  constructor() { }

  ngOnInit(): void {
    this.processedData = structuredClone(this.analysisData);
    this.processedData = this.processedData.filter((data, index) => {
      const currentProduct = data.product?.produto;
      const stock = currentProduct?.estoqueAtual || 0;
      const isOutOfStock = stock === 0;
      const hasLowStock = !isOutOfStock && stock < 10;
      return index < 50 && (isOutOfStock || hasLowStock);
    });
  }


}
