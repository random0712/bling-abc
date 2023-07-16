import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { IOrder } from 'src/app/services/bling/order/order.model';

@Component({
  selector: 'app-sales-by-platform',
  templateUrl: './sales-by-plataform.component.html',
  styleUrls: ['./sales-by-plataform.component.scss']
})
export class SalesByPlatformComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  @Input() set orders(orders: IOrder[]){
    this.generateDonutChart(orders);
  };

  constructor() { }

  ngOnInit(): void {
  }


  private generateDonutChart(orders: IOrder[]) {
    const salesByPlatform: any = {};
    orders.forEach(order => {
      const platform = order.pedido.tipoIntegracao
        .replace("\"", '')
        .trim()
        .toUpperCase() || 'OUTROS';

      salesByPlatform[platform] = salesByPlatform[platform] 
        ? salesByPlatform[platform] + 1
        : 1;     
    })
    
    const colors: any = {
      'SHOPEE': '#f53d2d',
      'MERCADOLIVRE': '#fff159',
      'LOJAINTEGRADA': '#2bc4c3'
    }

    const result = Object.keys(salesByPlatform).map(key => {
      const result: {name: string, y: number, color?: string} = {name: key, y: salesByPlatform[key]}
      if(colors[key]) {
        result.color = colors[key];
      }
      return result;
    })


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
          valueSuffix: ' Pedidos'
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
