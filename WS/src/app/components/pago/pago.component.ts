import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { isUndefined } from 'util';
import { Servis } from '../../model/servis';

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
  //carrito: Carrito;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      console.log(params);
     /* this.carritoService.findCarrito(params.id).subscribe(result => {
        this.carrito = result;
      });*/
    });
    //buscarLaOrden
    //lleanr tabla
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
      //borrarOrden del sistema
      this.router.navigate([`/home`]);
    }
  }

}
