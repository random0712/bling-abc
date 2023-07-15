import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlingClientService } from 'src/app/http/bling-client/bling-client.service';
import { blingUrls } from '../bling.conf';
import { IProduct } from './product.model';

const { getProductPageJson } = blingUrls.products;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private blingClient: BlingClientService) { }

  getProductsByPage(page: number): Observable<{retorno: {produtos: IProduct[]}}> {
    return this.blingClient.get(getProductPageJson(page), '&imagem=S&estoque=S');
  }
}
