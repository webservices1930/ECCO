import { Injectable } from '@angular/core';
import { CarritoCompras } from '../model/carrito-compras';
import { CarritoService } from './carrito.service';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root'
})
export class TarjetaCarritoService {

  carrito;
  constructor(private carritoService: CarritoService, private _SesionServicio: SesionService) { }

  public actualizarCarrito() {
    this.carritoService.getCarritoByUsernameJSON(this._SesionServicio.id).then(res =>{
      //Object.assign(this.carrito, res);
      this.carrito= res;
      console.log('=========================');
      console.log(this.carrito);
     });
  }
}
