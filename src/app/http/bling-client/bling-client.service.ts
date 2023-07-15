import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlingClientService {

  constructor(private httpClient: HttpClient) { }

  get(url: string, paramString: string='', options? : {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    context?: HttpContext;
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    withCredentials?: boolean;
  }): Observable<any> {
    return this.httpClient.get(`${url}?apikey=${environment.appKey}${paramString}`, options)
  }

  post(url: string, body: any | null, options?: {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    context?: HttpContext;
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    withCredentials?: boolean;
  }): Observable<any> {
    return this.httpClient.post(`${url}?apikey=${environment.appKey}`, body, options)
  }
}
