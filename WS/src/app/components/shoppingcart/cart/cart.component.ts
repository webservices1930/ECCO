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

  //servicios:Servis[]=[];
  servicios: Servis[] ;
  //total:number[]=[];
  total: string;
  carrito: CarritoCompras;
  // tslint:disable-next-line: max-line-length
  _subscripcion: any;
  constructor(private _SesionServicio:SesionService, private router: Router, private carritoService: CarritoService, private tarjetaCarrito: TarjetaCarritoService) { }

  ngOnInit() {
     /*this.total=this._SesionServicio.getTotal();
     this.servicios=this._SesionServicio.getServicios();*/
     /*this._subscripcion = this.tarjetaCarrito.servicios.subscribe((servicioss) => {
       this.servicios = servicioss;
     });*/
    /* this._subscripcion = this.tarjetaCarrito.total.subscribe((totall) => {
      this.total = totall;
    });*/
     this.servicios = this.tarjetaCarrito.getServicios();
     this.total = this.tarjetaCarrito.getTotal();
  }
  actualizarTotal(){
    //this.total=this._SesionServicio.getTotal();
  }
  quitarServicio(servicio:Servis){
    this._SesionServicio.quitarServicio(servicio);
    //this.total=this._SesionServicio.getTotal();
    this.carritoService.removerDelCarrito(this._SesionServicio.id, servicio);
  }

  pago() {
    //create Order en el servidor
    this.router.navigate(['/pago']);
  }
}
