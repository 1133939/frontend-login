import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-atualizar-dados',
  templateUrl: './atualizar-dados.component.html',
  styleUrls: ['./atualizar-dados.component.css']
})
export class AtualizarDadosComponent implements OnInit {
public formulario : FormGroup = new FormGroup({
  'email': new FormControl(null, [Validators.email, Validators.required]),
  'senha': new FormControl(null, [Validators.required, Validators.minLength(5)]),
  'confirmarSenha': new FormControl(null, [Validators.required, Validators.minLength(5)])
})
  constructor() { }

  ngOnInit() {
  }
comparaSenha(){

}
atualizarDados(){
  console.log(this.formulario.valid)
  if(this.formulario.value.senha == this.formulario.value.confirmarSenha && this.formulario.valid){
    console.log(this.formulario)
  }
}
}
