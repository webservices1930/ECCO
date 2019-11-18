import { Usuario } from './usuario';
import { Servis } from './servis';
export class Resena {
  constructor(
    public cliente: Usuario,
    public servicio: Servis,
    public comentario: string,
    public calificacion: number,
    public fecha: string,
    public idServicio?:any,
    public id?:any
  ) {}
}
