export class Usuario {
  constructor(
    public nombre: string,
    public nombreUsuario: string,
    public edad:number,
    public contrasena:string,
    public descripcion:string,
    public foto: string,
    public telefono: number,
    public Id?:number
  ) {}
}
