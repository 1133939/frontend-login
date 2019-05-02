import { Usuario } from './usuario.model';

export class Rifa{
    constructor(public id : number, public nome : string, public estado : number,
         public quantidade : number, public usuarios : Array<Usuario>){

    }
}