import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isUndefined } from 'util';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  numTarjeta: number;
  cuotas: number;
  cvs: string;
  fechavencimiento: Date;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public pago(){
    console.log('num' + this.numTarjeta);
    console.log('cuotas' + this.cuotas);
    console.log('cvs' + this.cvs);
    console.log('fecha' + this.fechavencimiento);
    if ( this.numTarjeta === undefined || this.cuotas === undefined || this.cvs === undefined || this.fechavencimiento === undefined) {
      alert('Llene todos los campos');
    } else {
      alert('Pago realizado bajo el numero de tarjeta ' + this.numTarjeta);
      this.router.navigate([`/home`]);
    }
  }

}
