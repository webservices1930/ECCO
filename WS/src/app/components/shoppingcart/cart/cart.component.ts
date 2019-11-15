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
  servicios;
  //total:number[]=[];
  total;
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
    //this.carrito = new CarritoCompras();
    this.servicios =[];
    this.total = 0;
    this.carritoService.getCarritoServicios(this._SesionServicio.id).subscribe(result => {
      this.carrito = result;
      this.servicios = this.carrito.servicios;
      this.total =  this.carrito.costoTotal;
      console.log(this.carrito);
    });
  }
  actualizarTotal(){
    //this.total=this._SesionServicio.getTotal();
  }
  quitarServicio(servicio:Servis){
    //this._SesionServicio.quitarServicio(servicio);
    //this.total=this._SesionServicio.getTotal();

    this.carritoService.removerDelCarrito(this._SesionServicio.id, servicio);
    /*var tot = +this.total;
    for(var i=0;i<this.servicios.length;i++) {
          if(this.servicios[i].nombre === servicio.nombre){
              this.servicios.splice(i, 1);
              tot-=servicio.costo;
              break;
          }
      }
    this.total = String(tot);*/
  }

  pago() {
    //create Order en el servidor
    this.router.navigate(['/pago']);
  }
}
