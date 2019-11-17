import { Usuario } from './usuario';
export class Proveedor extends Usuario{
  constructor(
    public nombre: string,
    public nombreUsuario: string,
    public edad:number,
    public contrasena:string,
    public descripcion:string,
    public foto: string,
    public telefono: number,
    public paginaWeb: string,
    public contactoRS: string,
    public Id?:number
  ) {
    super(nombre,nombreUsuario,edad,contrasena,descripcion,foto,telefono);
  }
}
