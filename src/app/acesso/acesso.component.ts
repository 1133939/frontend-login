import { Component, OnInit } from '@angular/core';
import {trigger, state, transition, animate, style} from '@angular/animations'

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations:[trigger('oscila-imagem', [
    state('created', style({
      opacity:0.9
    })
    ),
    state('hidden', style({
      opacity:0.2
    })
    ), transition('hidden <=> created', animate('800ms ease-in'))
  ]),
  
  trigger('change-component', [
    state('created', style({
      opacity:1
    })),
    transition('void -> created', [
      style({
        opacity:0,
        transform: 'translate(0,100px)'
      }),
      animate('500ms 0s ease-in-out')
    ])
  ])
]
})
export class AcessoComponent implements OnInit {
public estado : string = 'hidden';
public component : string = 'created'
public cadastro : boolean = false;
  constructor() { }

  ngOnInit() {
    this.logoOscila()
  }
public changePanel(event : string){
this.cadastro= event=='cadastro' ? true : false;
}

  public logoOscila(){
    if(this.estado == 'hidden'){
      this.estado='created'
    }else{
      this.estado='hidden'
    }
    setTimeout(()=> this.logoOscila(), 800)
  }

}
