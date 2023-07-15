import { Component, Input, OnInit } from '@angular/core';
import { IItemData } from 'src/app/services/shared/shared.model';

@Component({
  selector: 'app-high-stock-list',
  templateUrl: './high-stock-list.component.html',
  styleUrls: ['./high-stock-list.component.scss']
})
export class HighStockListComponent implements OnInit {

  @Input() analysisData: IItemData[] = [];
  processedData: IItemData[] = [];

  constructor() { }

  ngOnInit(): void {
    this.processedData = structuredClone(this.analysisData);
    this.processedData = this.processedData.sort((a, b) =>  {
      const stockA = a.product?.produto.estoqueAtual || 0;
      const stockB = b.product?.produto.estoqueAtual || 0;
      return stockB - stockA;
    }).filter((_value, index) => index < 20);
  }

}
