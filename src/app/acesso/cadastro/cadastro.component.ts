import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../../app/model/usuario.model';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
@Output() public exibirLogin : EventEmitter<string> = new EventEmitter();
public form : FormGroup = new FormGroup({
  'email' : new FormControl(null, [Validators.email, Validators.required]),
  'senha' : new FormControl(null, [Validators.minLength(5), Validators.required]),
  'confirmarSenha' : new FormControl(null, [Validators.minLength(5), Validators.required])
})
  constructor() { }

  ngOnInit() {
  }
  changeToLogin(){
this.exibirLogin.emit('login');
  }
cadastrarUsuario(){
  if(this.form.value.confirmarSenha == this.form.value.senha && this.form.valid){
  let usuario : Usuario = new Usuario(null, this.form.value.email, this.form.value.senha)
  console.log(usuario)
}else{
  this.form.get('email').markAsTouched()
  this.form.get('senha').markAsTouched()
  this.form.get('confirmarSenha').markAsTouched()
}
}
}
