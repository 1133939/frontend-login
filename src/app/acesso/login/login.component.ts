import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() public exibirCadastro : EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  eventCadastrar():void{
    this.exibirCadastro.emit('cadastro')
  }

}
