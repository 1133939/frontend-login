import { Usuario } from './usuario.model';
import { Rifa } from './rifa.model';

export class Sorteio{

constructor(
    public id: number,
    public usuarioVencedor : Usuario,
    public rifa : Rifa,
    public date : Date){
}
}