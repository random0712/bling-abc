import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { IItemData } from 'src/app/services/shared/shared.model';

@Component({
  selector: 'app-stock-by-brand',
  templateUrl: './stock-by-brand.component.html',
  styleUrls: ['./stock-by-brand.component.scss']
})
export class StockByBrandComponent implements OnInit {

  @Input() set analysisData(data: IItemData[]){
    this.generateDonutChart(data);
  };

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor() { }

  ngOnInit(): void {
  }


  private generateDonutChart(data: IItemData[]) {
    const stockByBrand: any = {};
    data.forEach(item => {
      const product = item.product?.produto;

      const isKitProduct = product?.estrutura && product.estrutura.length > 1;
      const hasStock = product?.estoqueAtual && product?.estoqueAtual > 0;

      if(!hasStock || isKitProduct) {
        return;
      }

      const brand = product?.marca
        .replace("\"", '')
        .trim()
        .toUpperCase() || 'OUTROS';

      stockByBrand[brand] = stockByBrand[brand] 
        ? stockByBrand[brand] + product?.estoqueAtual
        : product?.estoqueAtual;     
    })
    

    

    const result = Object.keys(stockByBrand).map(key => ({name: key, y: stockByBrand[key]}))


    this.chartOptions = {
      title: {
          text: '',
          align: 'center'
      },
      subtitle: {
          useHTML: true,
          text: '',
          floating: true,
          verticalAlign: 'middle',
          y: 30
      },
  
      legend: {
          enabled: false
      },
  
      tooltip: {
          valueDecimals: 0,
          valueSuffix: ' Unidades'
      },
      plotOptions : {
        pie: {
           shadow: false,
           center: ['50%', '50%'],
           size:'100%',
           innerSize: '70%'            
        }
     },
      series: [
          {
              type: 'pie',
              name: "Vendas",
              data: result
          }
      ]
    };
  }
}
