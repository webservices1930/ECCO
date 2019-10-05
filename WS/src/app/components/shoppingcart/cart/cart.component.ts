import { Component, OnInit, Output } from '@angular/core';
import { SesionService } from 'src/app/servicios/sesion.service';
import { Servis } from '../../../model/servis';
import { Router, OutletContext } from '@angular/router';
import { CarritoCompras } from '../../../model/carrito-compras';
import { CarritoService } from '../../../servicios/carrito.service';
import { EventEmitter } from 'events';
import { TarjetaCarritoService } from '../../../servicios/tarjeta-carrito.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  servicios:Servis[]=[];
  total:number[]=[];
  //total: number;
  carrito: CarritoCompras;
  // tslint:disable-next-line: max-line-length
  constructor(private _SesionServicio:SesionService, private router: Router, private carritoService: CarritoService, private tarjetaCarrito: TarjetaCarritoService) { }

  ngOnInit() {
     this.total=this._SesionServicio.getTotal();
     this.servicios=this._SesionServicio.getServicios();
     /*this.servicios = this.tarjetaCarrito.carrito;
     this.total = this.tarjetaCarrito.carrito.CostoTotal;*/

     console.log(this.servicios);
     console.log(this.total);
  }
  actualizarTotal(){
    this.total=this._SesionServicio.getTotal();
  }
  quitarServicio(servicio:Servis){
    this._SesionServicio.quitarServicio(servicio);
    this.total=this._SesionServicio.getTotal();
  }

  pago() {
    //create Order en el servidor
    this.router.navigate(['/pago']);
  }
}
