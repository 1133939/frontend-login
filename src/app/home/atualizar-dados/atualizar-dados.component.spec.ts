import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarDadosComponent } from './atualizar-dados.component';

describe('AtualizarDadosComponent', () => {
  let component: AtualizarDadosComponent;
  let fixture: ComponentFixture<AtualizarDadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtualizarDadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
