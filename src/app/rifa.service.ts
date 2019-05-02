import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API } from './URL_API';
import { map } from 'rxjs/operators';
import { Rifa } from './model/rifa.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RifaService{

    constructor(private http : HttpClient){

    }
    getRifasByName(pesquisa : string) : Observable<Rifa>{
return this.http.get(`${URL_API}/rifas/buscaNome/${pesquisa}`).pipe(map((response: any)=> {
    return response
}))
    }
}