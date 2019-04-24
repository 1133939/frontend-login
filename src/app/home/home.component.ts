import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public atualizar: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  showAtualizarDados(){
    this.atualizar= this.atualizar == true ? false : true;
  }
}
