import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../../app/model/usuario.model';
import { UsuarioService } from 'src/app/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [UsuarioService]
})
export class CadastroComponent implements OnInit {

@Output() public exibirLogin : EventEmitter<string> = new EventEmitter();

public form : FormGroup = new FormGroup({
  'usuario' : new FormControl(null, [Validators.required, Validators.minLength(5)]),
  'nome' : new FormControl(null, [Validators.minLength(5), Validators.required]),
  'senha' : new FormControl(null, [Validators.minLength(5), Validators.required]),
  'confirmarSenha' : new FormControl(null, [Validators.minLength(5), Validators.required])
})
  constructor(private service : UsuarioService) { }

  ngOnInit() {
  }
  changeToLogin(){
this.exibirLogin.emit('login');
  }
cadastrarUsuario() : void{
  if(this.form.value.confirmarSenha == this.form.value.senha && this.form.valid){
  let usuario : Usuario = new Usuario(null, this.form.value.usuario, 0, this.form.value.nome, this.form.value.senha)
  this.service.getUsuario(usuario.usuario).subscribe((response : any)=>{
    if(response == null){
      this.service.insertUsuario(usuario).subscribe((response : number) => {
        console.log(response)
        alert('Cadastrado com sucesso')
      })
    }else{
     this.form.get('usuario').markAsPending()
    }
  })
}else{
  this.form.get('usuario').markAsTouched()
  this.form.get('nome').markAsTouched()
  this.form.get('senha').markAsTouched()
  this.form.get('confirmarSenha').markAsTouched()
  alert('Preencha os dados corretamente')
}
}
setConfirmarSenha(confirmarSenha : string) : void{
this.form.get('confirmarSenha').setValue(confirmarSenha)
if(this.form.value.senha != this.form.value.confirmarSenha){
  this.form.get('confirmarSenha').markAsPending()
}
}
setSenha(senha : string) : void{
this.form.get('senha').setValue(senha)
}
usuarioExistente(usuario : string){
  this.service.getUsuario(usuario).subscribe((response : any)=>{
    if(response != null){
      this.form.get('usuario').markAsPending()
    }
  })
}


}
