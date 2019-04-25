import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './model/usuario.model';
import {map, catchError} from 'rxjs/operators'
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
    updateUsuario(usuario : Usuario) : Observable<Usuario>{
        console.log('cehgou')
        let headers = new HttpHeaders({'Content-Type' : 'application/json'})
        let options = {headers}
        return this.http.put<Usuario>(`${URL_API}/usuario/${usuario.id}`, (usuario), options).pipe(map((response:any)=> {
            console.log(response)
            return response;
        }))
      }
      getUsuarios(pesquisa : string) : Observable<Array<Usuario>>{
return this.http.get(`${URL_API}/usuario?email_like=${pesquisa}`).pipe(map((response : any)=> response))
      }
    }
