import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { isUndefined } from 'util';
import { Servis } from '../../model/servis';
import { SesionService } from 'src/app/servicios/sesion.service';
import { PagoService } from '../../servicios/pago.service';
import { ServicioTarjetaComponent } from '../mostrarservicio/servicio-tarjeta/servicio-tarjeta.component';
import { TarjetaCarritoService } from '../../servicios/tarjeta-carrito.service';


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

  servicios:Servis[]=[];
  total:number[]=[];

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private route: ActivatedRoute,private _SesionServicio:SesionService, private pagoservice: PagoService, private tarjetaCarritoService: TarjetaCarritoService) { }

  ngOnInit() {
    /*this.route.queryParams
    .subscribe(params => {
      console.log(params);
     /* this.carritoService.findCarrito(params.id).subscribe(result => {
        this.carrito = result;
      });
    });

    //buscarLaOrden
    //lleanr tabla
    */
    this.servicios = this.tarjetaCarritoService.getServicios();
    this.total = this.tarjetaCarritoService.getTotal();
    console.log(this.servicios);
    console.log(this.total);
  }

  public pago(){
    console.log('num' + this.numTarjeta);
    console.log('cuotas' + this.cuotas);
    console.log('cvs' + this.cvs);
    console.log('fecha' + this.fechavencimiento);
    if ( this.numTarjeta === undefined || this.cuotas === undefined || this.cvs === undefined || this.fechavencimiento === undefined) {
      alert('Llene todos los campos');
    } else {
      alert('El pago se realizara bajo el numero de tarjeta ' + this.numTarjeta);
      this.pagoservice.pago(this._SesionServicio.id).subscribe(respuesta => {
        this.router.navigate([`/servicioss`]);
      });
      //this.tarjetaCarritoService.actualizarCarrito();
    }
  }

}
