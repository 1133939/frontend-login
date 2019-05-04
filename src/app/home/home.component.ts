import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RifaService } from '../rifa.service';
import { Rifa } from '../model/rifa.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../usuario.service';
import { Subscription, Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [RifaService, UsuarioService]
})
export class HomeComponent implements OnInit {
public termoPesquisa : string
public minhasRifas : boolean = false;
public atualizar: boolean = false;
public pesquisar: boolean = false;
public rifas : Observable<Array<Rifa>>;
public usuario : Usuario = new Usuario(null,null,null,null,null);
public jwtHelperService: JwtHelperService  = new JwtHelperService ();
private subjectPesquisa : Subject<string> = new Subject<string>()

  constructor(private service : RifaService,
     private router : Router,
     private usuarioService : UsuarioService) { }

  ngOnInit() {
    this.rifas = this.subjectPesquisa.pipe(
      debounceTime(1000),
      switchMap((termo:string)=>{
        if(termo.trim()===''){
         return of<Array<Rifa>>([])
        }
        console.log('fazendo requisicao')
        return this.service.getRifasByName(termo)
      }),catchError((erro) => {
        console.log(erro)
        return of<Array<Rifa>>([])
      })
      
      ) 

    if(localStorage.getItem('user')== "null"){
      this.router.navigate(['/'])
    }else{
      let token = localStorage.getItem('user').substr(7)
     this.usuario.usuario = this.jwtHelperService.decodeToken(token).sub
     this.usuarioService.getUsuario(this.usuario.usuario).subscribe((response : any) => {
       this.usuario = response;
     })
    }

  }
    public pesquisa(pesquisa : string){
      this.termoPesquisa = pesquisa;
      this.atualizar=false;
      this.minhasRifas=false;
      this.pesquisar=true;
      this.subjectPesquisa.next(pesquisa)

     }
   
  showAtualizarDados(){
    this.pesquisar= false;
    this.minhasRifas=false;
    this.atualizar= true;
  }
  showMinhasRifas(){
    this.pesquisar= false;
    this.minhasRifas=true;
    this.atualizar= false;
  }
  logout(){
    localStorage.setItem('user',null);
     this.router.navigate(['/'])

  }
  adquirirRifa(rifa : Rifa){
    console.log('adquirirrifa')
    if(this.usuario.tickets == 0){
      alert("Compre mais tickets para adquirir uma rifa !!")
    }else{
    this.service.adquirirRifa(rifa, this.usuario.id).subscribe((response: any)=>{
      console.log(response)
      alert("Rifa adquirida com sucesso!")
    this.usuarioService.getUsuario(this.usuario.usuario).subscribe((response: any)=>{
      console.log('Usuario response',response)
      this.usuario = response;
    })
    this.pesquisa(this.termoPesquisa)
    })
  }
}
}
