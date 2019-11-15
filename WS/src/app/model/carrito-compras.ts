import { Servis } from './servis';
import { Usuario } from './usuario';
export class CarritoCompras {

  public Id: number;
  public numServicios: number;
  public costoTotal: number;
  public cliente: Usuario;
  public servicios: Servis[] = [];

  constructor(
  ) {}

  public getId(){
    return this.Id;
  }

  public setId(id){
    this.Id = id;
  }

  public getCliente() {
    return this.cliente;
  }

  public setCliente(cliente) {
     this.cliente = cliente;
  }

  public getServicios() {
    return this.servicios;
  }

  public setServicios(servicios: Servis[]) {
     this.servicios = servicios;
  }

  public calcularCostoTotal(){
    let suma = 0;
    this.servicios.forEach(element => {
      suma = suma + element.costo;
    });
    return suma;
  }

  public calcularNumPlanes(){
    return this.servicios.length;
  }

  public agregarServicio(seviciop: Servis){
    this.servicios.push(seviciop);
  }

}
