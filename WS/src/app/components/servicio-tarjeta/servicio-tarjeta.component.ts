import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciossComponent } from '../servicioss/servicioss.component';
import { Servi } from 'src/app/servicios/servicio.service';
import { CartComponent } from '../shoppingcart/cart/cart.component';
import { SesionService } from 'src/app/servicios/sesion.service';

@Component({
  selector: 'app-servicio-tarjeta',
  templateUrl: './servicio-tarjeta.component.html',
  styleUrls: ['./servicio-tarjeta.component.css']
})
export class ServicioTarjetaComponent implements OnInit {

  @Input() servicio: any = {};
  @Input() index: number;

  @Output() servicioSeleccionado: EventEmitter<number>;

  constructor(private router: Router, private _servicioSesion:SesionService) {
    this.servicioSeleccionado = new EventEmitter();
  }

  ngOnInit() {
  }

  verServicio() {
    // console.log(  this.index );
    this.router.navigate( ['/servicio', this.index] );
    // this.servicioSeleccionado.emit( this.index );
  }

  agregarServicio(servicio:Servi){
    this._servicioSesion.agregarServicio(servicio);
  }

}
