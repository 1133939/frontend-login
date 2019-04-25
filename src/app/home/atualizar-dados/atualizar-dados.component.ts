import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/usuario.service';
import { Usuario } from 'src/app/model/usuario.model';

@Component({
  selector: 'app-atualizar-dados',
  templateUrl: './atualizar-dados.component.html',
  styleUrls: ['./atualizar-dados.component.css'],
  providers: [UsuarioService]
})
export class AtualizarDadosComponent implements OnInit {
public formulario : FormGroup = new FormGroup({
  'email': new FormControl(null, [Validators.email, Validators.required]),
  'senha': new FormControl(null, [Validators.required, Validators.minLength(5)]),
  'confirmarSenha': new FormControl(null, [Validators.required, Validators.minLength(5)])
})
  constructor(private service : UsuarioService) { }

  ngOnInit() {
  }
comparaSenha(){

}
validarSenha(){
  if(this.formulario.value.senha != this.formulario.value.confirmarSenha){
    this.formulario.get('confirmarSenha').markAsPending()
  }
}
atualizarDados(){
  let id : number= 524;
  if(this.formulario.value.senha == this.formulario.value.confirmarSenha && this.formulario.valid){
    let usuario : Usuario = new Usuario(524,this.formulario.value.email, this.formulario.value.senha)
    console.log(usuario)
    this.service.updateUsuario(usuario).subscribe((response:any) => console.log(response))
  }
}
}
