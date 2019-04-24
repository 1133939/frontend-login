import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './model/usuario.model';
import {map} from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { URL_API } from './URL_API';

@Injectable()
export class UsuarioService{
    constructor(private http: HttpClient){

    }
    insertUsuario(usuario : Usuario): Observable<number>{
        let headers = new HttpHeaders({'Content-Type' : 'application/json'})
        let options = {headers}
        return this.http.post(`${URL_API}/usuario`,(usuario), options).pipe(map((response : any)=> {
            return response.id
        }))
    }
    auth(usuario : Usuario){
        
    }
}