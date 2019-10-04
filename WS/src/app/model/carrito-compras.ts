import { Servis } from './servis';
import { Usuario } from './usuario';
export class CarritoCompras {

  public cliente;
  public servicios: Servis[];
  public CostoTotal: number;
  public numPlanes: number;

  constructor(
  ) {}

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

  public getCostoTotal(){
    return this.CostoTotal;
  }

  public setCostoTotal(costo: number){
     this.CostoTotal = costo;
  }

  public getNumPlanes(){
    return this.numPlanes;
  }

  public setNumPlanes(num: number){
     this.numPlanes = num;
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
