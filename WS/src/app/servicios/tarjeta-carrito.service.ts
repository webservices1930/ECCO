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

  servicios;
  total : Subject<string> = new Subject<string>();
  constructor(private carritoService: CarritoService, private _SesionServicio: SesionService) { }

  public actualizarCarrito() {
    this.carritoService.getCarritoCostoByUsernameJSON(this._SesionServicio.id).then(res =>{
      //Object.assign(this.carrito, res);
      this.total = res;
      console.log('=========================');
      console.log(this.total);
     });

     this.carritoService.getCarritoServiciosByUsernameJSON(this._SesionServicio.id).then(res =>{
      //Object.assign(this.carrito, res);
      this.servicios= res;
      console.log('=========================');
      console.log(this.servicios);
     });
     //this.servicios = this.getServicosCarrito();
  }
}
