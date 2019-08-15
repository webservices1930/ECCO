import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicio-tarjeta',
  templateUrl: './servicio-tarjeta.component.html',
  styleUrls: ['./servicio-tarjeta.component.css']
})
export class ServicioTarjetaComponent implements OnInit {

  @Input() servicio: any = {};
  @Input() index: number;

  @Output() servicioSeleccionado: EventEmitter<number>;

  constructor(private router: Router) {
    this.servicioSeleccionado = new EventEmitter();
  }

  ngOnInit() {
  }

  verServicio() {
    // console.log(  this.index );
    this.router.navigate( ['/servicio', this.index] );
    // this.servicioSeleccionado.emit( this.index );
  }

}
