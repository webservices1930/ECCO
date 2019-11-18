import { Component, OnInit, Output } from '@angular/core';
import { SesionService } from 'src/app/servicios/sesion.service';
import { Servis } from '../../../model/servis';
import { Router, OutletContext } from '@angular/router';
import { CarritoCompras } from '../../../model/carrito-compras';
import { CarritoService } from '../../../servicios/carrito.service';
import { EventEmitter } from 'events';
import { TarjetaCarritoService } from '../../../servicios/tarjeta-carrito.service';
import { PagoService } from '../../../servicios/pago.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  servicios =[];
  total;
  carrito: CarritoCompras;
  bandera: boolean = true;
  public href: string = "";
  // tslint:disable-next-line: max-line-length
  constructor(private _SesionServicio:SesionService, private router: Router, private carritoService: CarritoService, private pagoservice: PagoService) { }

  ngOnInit() {
     /*this.total=this._SesionServicio.getTotal();
     this.servicios=this._SesionServicio.getServicios();*/
     /*this._subscripcion = this.tarjetaCarrito.servicios.subscribe((servicioss) => {
       this.servicios = servicioss;
     });*/
    //this.carrito = new CarritoCompras();
    this.total = 0;
    this.href = this.router.url;
    if (this.href == "/pago"){
      this.bandera = false;
    }
    this.carritoService.getCarritoServicios(this._SesionServicio.id).subscribe(result => {
      this.carrito = result;
      this.servicios = this.carrito.servicios; //esto no asigna nada
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

    this.carritoService.removerDelCarrito(this._SesionServicio.id, servicio).subscribe(result => {
      alert("Eliminado correctamente");
      if (this.carrito.servicios.length != 1){
        this.carritoService.getCarritoServicios(this._SesionServicio.id).subscribe(result => {
          console.log("Entra");
            console.log(result);
            this.carrito = result;
            this.servicios = this.carrito.servicios; //esto no asigna nada
            this.total =  this.carrito.costoTotal;
            console.log(this.carrito);
        });
      }
      else{
        this.carrito = null;
        this.servicios = []; //esto no asigna nada
        this.total =  0;
      }
    });
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
