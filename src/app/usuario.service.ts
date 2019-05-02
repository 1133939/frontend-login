import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './model/usuario.model';
import {map, catchError} from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { URL_API } from './URL_API';
import { Credenciais } from './model/credenciais.model';

@Injectable()
export class UsuarioService{
    constructor(private http: HttpClient){

    }
    insertUsuario(usuario : Usuario): Observable<any>{
        let headers = new HttpHeaders({'Content-Type' : 'application/json'})
        let options = {headers}
        return this.http.post(`${URL_API}/usuarios`,(usuario), options).pipe(map((response : any)=> {
            return response
        }))
    }
    auth(credenciais : Credenciais) : Observable<any>{
       return this.http.post(`${URL_API}/login`,(credenciais), {
           observe: 'response'})
    }
    updateUsuario(usuario : Usuario) : Observable<Usuario>{
        console.log('cehgou')
        let headers = new HttpHeaders({'Content-Type' : 'application/json'})
        let options = {headers}
        return this.http.put<Usuario>(`${URL_API}/usuarios/${usuario.id}`, (usuario), options).pipe(map((response:any)=> {
            console.log(response)
            return response;
        }))
      }
      getUsuarios(pesquisa : string) : Observable<Array<Usuario>>{
return this.http.get(`${URL_API}/usuario?email_like=${pesquisa}`).pipe(map((response : any)=> response))
      }
      getUsuario(usuarioNome : string) : Observable<Usuario>{
        return this.http.get(`${URL_API}/usuarios/?usuario=${usuarioNome}`).pipe(map((response : any)=> {
            return response}))
              }
    }
