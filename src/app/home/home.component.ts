import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../model/usuario.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UsuarioService]
})
export class HomeComponent implements OnInit {
public atualizar: boolean = false;
public pesquisar: boolean = false;
public usuarios : Array<Usuario>
  constructor(private service : UsuarioService) { }

  ngOnInit() {
  }
  showAtualizarDados(){
    this.pesquisar= false;
    this.atualizar= true;
  }
  showPesquisar(termo : string){
    this.atualizar=false;
    this.pesquisar=true;
    this.service.getUsuarios(termo).subscribe((response:any)=> {
      this.usuarios=response
    })
  }
}
