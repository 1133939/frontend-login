import { Component, OnInit } from '@angular/core';
import { RifaService } from 'src/app/rifa.service';
import { Rifa } from 'src/app/model/rifa.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from 'src/app/model/usuario.model';

@Component({
  selector: 'app-minhas-rifas',
  templateUrl: './minhas-rifas.component.html',
  styleUrls: ['./minhas-rifas.component.css'],
  providers: [RifaService]
})
export class MinhasRifasComponent implements OnInit {
public rifas : Array<Rifa>
public usuario : string;
public jwtHelper : JwtHelperService = new JwtHelperService()
  constructor(private service : RifaService) { }

  ngOnInit() {
    this.getRifasFromUsuario();
  }
  getRifasFromUsuario() {
   let token: string = localStorage.getItem('user').substr(7)
  this.usuario = this.jwtHelper.decodeToken(token).sub
    this.service.getRifaByUsuario(this.usuario).subscribe((response:any)=>{
      this.rifas=response;
      console.log(this.rifas)
    })
  }
  qtdRifas(rifa : Rifa) : number{
  let i : number = 0;
    rifa.usuarios.forEach((usuario : Usuario)=>{
if(this.usuario == usuario.usuario){
i++;
}
    })
    return i;
  }
}
