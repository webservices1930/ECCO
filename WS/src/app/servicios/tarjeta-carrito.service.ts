import { Injectable } from '@angular/core';
import { CarritoCompras } from '../model/carrito-compras';
import { CarritoService } from './carrito.service';
import { SesionService } from './sesion.service';
import { Servis } from '../model/servis';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaCarritoService {

  carrito;
  carritoe: CarritoCompras;
  servicios = [];
  serviciossubject = new BehaviorSubject<undefined[]>(this.servicios);
  constructor(private carritoService: CarritoService, private _SesionServicio: SesionService) { }

  public actualizarCarrito() {
    this.carritoService.getCarritoByUsernameJSON(this._SesionServicio.id).then(res =>{
      //Object.assign(this.carrito, res);
      this.carrito= res;
      console.log('=========================');
      console.log(this.carrito);
     });
     this.carritoe = this.carrito;
     //this.servicios = this.getServicosCarrito();
  }

  public getServicosCarrito(){
    console.log("=====aquiservicis===");
    //console.log(this.carrito.servicios);
    console.log(this.carritoe);
      return this.carritoe.servicios;
  }

  public getTotal(){
    return this.carrito.CostoTotal;
  }
}
