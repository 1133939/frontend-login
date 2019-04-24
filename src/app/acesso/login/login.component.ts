import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formLogin : FormGroup = new FormGroup({
    'email' : new FormControl(null, [Validators.required]),
    'senha' : new FormControl(null, [Validators.required])
  })
  @Output() public exibirCadastro : EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  eventCadastrar():void{
    this.exibirCadastro.emit('cadastro')
  }
  fazerLogin() :void{
    let usuario : Usuario = new Usuario (null, this.formLogin.value.email, this.formLogin.value.senha)
    console.log(usuario)
  }

}
