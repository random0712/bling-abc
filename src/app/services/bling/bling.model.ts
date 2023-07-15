import { Observable } from "rxjs";

export type GenericBlingLoadFN = (page: number, filters?: any) => Observable<{
    retorno: any;
}>