import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlingClientService } from 'src/app/http/bling-client/bling-client.service';
import { blingUrls } from '../bling.conf';
import { IOrder } from './order.model';


const { getOrderPageJson } = blingUrls.order;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private blingClient: BlingClientService) { }

  getOrdersByPage(page: number, filters?: {emissionDate: {start: string, end: string}}): Observable<{retorno: {pedidos: IOrder[]}}> {
    let paramString = '&filters=idSituacao[15,9];';
    const initialLength = paramString.length;

    if(filters?.emissionDate) {
      const { start, end } = filters.emissionDate;
      paramString += ` dataEmissao[${start} TO ${end}]`;
    }
    
    const hasParams = initialLength < paramString.length;
    return this.blingClient.get(getOrderPageJson(page), hasParams ? paramString : '');
  }
}
