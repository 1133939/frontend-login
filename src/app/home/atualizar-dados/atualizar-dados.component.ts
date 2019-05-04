import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/usuario.service';
import { Usuario } from 'src/app/model/usuario.model';
import { JwtHelperService  } from '@auth0/angular-jwt';

@Component({
  selector: 'app-atualizar-dados',
  templateUrl: './atualizar-dados.component.html',
  styleUrls: ['./atualizar-dados.component.css'],
  providers: [UsuarioService]
})
export class AtualizarDadosComponent implements OnInit {
public formulario : FormGroup = new FormGroup({
  'nome': new FormControl(null,[Validators.minLength(5)]),
  'senha': new FormControl(null,[Validators.minLength(5)]),
  'confirmarSenha': new FormControl(null,[Validators.minLength(5)])
})
public usuario : Usuario = new Usuario(null,null,null,null,null);
public jwtHelperService: JwtHelperService  = new JwtHelperService ();
  constructor(private service : UsuarioService) { }

  ngOnInit() {
   let token = localStorage.getItem('user').substr(7)
   this.usuario.usuario = this.jwtHelperService.decodeToken(token).sub
   console.log(this.usuario.usuario)
    this.service.getUsuario(this.usuario.usuario).subscribe((response : any)=>{
      this.usuario=response;
      console.log(this.usuario)
    });
  }
validarSenha(){
  if(this.formulario.value.senha != this.formulario.value.confirmarSenha){
    this.formulario.get('confirmarSenha').markAsPending()
  }
}
atualizarDados(){
  if(this.formulario.value.senha == this.formulario.value.confirmarSenha && this.formulario.valid){
    let usuario : Usuario = new Usuario(this.usuario.id,this.usuario.usuario,null, this.formulario.value.nome, this.formulario.value.senha)
    console.log(usuario)
    this.service.updateUsuario(usuario).subscribe((response:any) => {
      console.log(response)
      alert('Atualização feita com sucesso!')
    })
  }
}
}
