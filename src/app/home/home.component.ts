import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RifaService } from '../rifa.service';
import { Rifa } from '../model/rifa.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [RifaService]
})
export class HomeComponent implements OnInit {
public atualizar: boolean = false;
public pesquisar: boolean = false;
public rifas : Array<Rifa>;
  constructor(private service : RifaService, private router : Router) { }

  ngOnInit() {
    if(localStorage.getItem('user')== "null"){
      this.router.navigate(['/'])
    }
  }
  showAtualizarDados(){
    this.pesquisar= false;
    this.atualizar= true;
  }
  showPesquisar(termo : string){
    this.atualizar=false;
    this.pesquisar=true;
    this.service.getRifasByName(termo).subscribe((response:any)=> {
      this.rifas=response
    })
  }
  logout(){
    localStorage.setItem('user',null);
     this.router.navigate(['/'])

  }
}
