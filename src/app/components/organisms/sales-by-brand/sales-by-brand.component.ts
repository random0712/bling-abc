import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { IItemData } from 'src/app/services/shared/shared.model';

@Component({
  selector: 'app-sales-by-brand',
  templateUrl: './sales-by-brand.component.html',
  styleUrls: ['./sales-by-brand.component.scss']
})
export class SalesByBrandComponent implements OnInit {

  @Input() set analysisData(data: IItemData[]){
    this.generateDonutChart(data);
  };

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor() { }

  ngOnInit(): void {
  }

  private generateDonutChart(data: IItemData[]) {
    const salesByBrand: any = {};
    data.forEach(item => {
      if(item.quantity == 0) {
        return;
      }

      const brand = item.product?.produto.marca
        .replace("\"", '')
        .trim()
        .toUpperCase() || 'OUTROS';

      salesByBrand[brand] = salesByBrand[brand] 
        ? salesByBrand[brand] + item.quantity
        : item.quantity;     
    })
    

    const result = Object.keys(salesByBrand).map(key => ({name: key, y: salesByBrand[key]}))


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
