import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CartComponent } from '../../shoppingcart/cart/cart.component';
import { SesionService } from 'src/app/servicios/sesion.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Servis } from '../../../model/servis';

@Component({
  selector: 'app-servicio-tarjeta',
  templateUrl: './servicio-tarjeta.component.html',
  styleUrls: ['./servicio-tarjeta.component.css']
})
export class ServicioTarjetaComponent implements OnInit {

  @Input() servicio: any = {};
  @Input() index: number;

  @Output() servicioSeleccionado: EventEmitter<number>;

  constructor(private router: Router, private _servicioSesion:SesionService,private sanitization:DomSanitizer) {
    this.servicioSeleccionado = new EventEmitter();
  }

  ngOnInit() {
  }

  verServicio() {
    console.log(  this.index );
    this.router.navigate( ['/servicio', this.index] );
  }

  agregarServicio(servicio:Servis){
    this._servicioSesion.agregarServicio(servicio);
  }

  public getSantizeUrl(img) {
    console.log(img);
    console.log(this.sanitization.bypassSecurityTrustUrl(img));
    return this.sanitization.bypassSecurityTrustUrl(img);
 }
}
