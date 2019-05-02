import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/usuario.service';
import { Credenciais } from 'src/app/model/credenciais.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {
  public formLogin : FormGroup = new FormGroup({
    'usuario' : new FormControl(null, [Validators.required]),
    'senha' : new FormControl(null, [Validators.required])
  })
  public email : string
  public token : string
  @Output() public exibirCadastro : EventEmitter<string> = new EventEmitter();
  constructor(private usuarioService : UsuarioService, private router : Router) { }

  ngOnInit() {
  }
  eventCadastrar():void{
    this.exibirCadastro.emit('cadastro')
  }
  fazerLogin() :void{
    let usuario : Credenciais = new Credenciais (this.formLogin.value.usuario, this.formLogin.value.senha)
    this.usuarioService.auth(usuario).subscribe((response:any)=>{
     this.token = response.headers.get('Authorization')
     localStorage.setItem('user',this.token);
     this.router.navigate(['/home'])
    })
  }

}
