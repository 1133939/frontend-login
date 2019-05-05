import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API } from './URL_API';
import { map } from 'rxjs/operators';
import { Rifa } from './model/rifa.model';
import { Injectable } from '@angular/core';
import { Usuario } from './model/usuario.model';

@Injectable()
export class RifaService{

    constructor(private http : HttpClient){

    }
    getRifasByName(pesquisa : string) : Observable<Array<Rifa>>{
return this.http.get(`${URL_API}/rifas/buscaNome/${pesquisa}`).pipe(map((response: any)=> {
    return response
}))
    }
    adquirirRifa(rifa : Rifa, idUsuario : number){
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json', 
            'Authorization' : localStorage.getItem('user')
        })
            let options = {headers : headers}
            
            let usuario : Usuario = new Usuario(idUsuario,undefined,undefined,undefined,undefined)
            console.log(usuario)
            let usuarios : Array<Usuario> = new Array
            console.log(usuarios)
            usuarios.push(usuario)
            let rifaUsuario : Rifa = new Rifa(undefined,undefined,undefined,undefined,usuarios,undefined)
    
            return this.http.put<Usuario>(`${URL_API}/rifas/${rifa.id}`, (rifaUsuario), options).pipe(map((response:any)=> {
                console.log(response)
                return response;
            }))
    }
    getRifaByUsuario(usuario : string) : Observable<Array<Rifa>>{
        return this.http.get(`${URL_API}/rifas/rifasUsuario/${usuario}`).pipe(map((response:any)=>{
            return response;
        }))
    }
}