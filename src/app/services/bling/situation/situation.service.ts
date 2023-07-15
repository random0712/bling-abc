import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlingClientService } from 'src/app/http/bling-client/bling-client.service';
import { blingUrls } from '../bling.conf';
import { IBlingSituation } from './situation.model';

const { getSituations } = blingUrls.situation;

@Injectable({
  providedIn: 'root'
})
export class SituationService {

  constructor(private blingClient: BlingClientService) { }

  getSituations (module: string): Observable<{retorno: {situacoes: IBlingSituation[]}}> {
    return this.blingClient.get(getSituations(module));
  }
}
