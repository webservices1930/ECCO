import { Servis } from './servis';

export class ServicioAlimentacion extends Servis {
  constructor(
    public nombre: string,
    public pais: string,
    public ciudad: string,
    public descripcion: string,
    public tipo: string,
    public costo: number,
    public img: string,
    public nombreproveedor: string,
    public numeropersonas: number,
    public tipocomida: string,
    public cantidadplatos: number,
    public idx?: number,
  ) {
    // tslint:disable-next-line: max-line-length
    super(nombre, pais, ciudad, undefined, descripcion, tipo, costo, img, nombreproveedor, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  }
}
