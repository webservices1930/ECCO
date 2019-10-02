import { Component, OnInit } from '@angular/core';
import { Servi } from 'src/app/servicios/servicio.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import { Servis } from '../../../model/servis';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  servicios:Servis[]=[];
  total:number[]=[];
  constructor(private _SesionServicio:SesionService, private router: Router) { }

  ngOnInit() {
    this.total=this._SesionServicio.getTotal();
    this.servicios=this._SesionServicio.getServicios();
    console.log(this.servicios);
    console.log(this.total);
  }
  actualizarTotal(){
    this.total=this._SesionServicio.getTotal();
  }
  quitarServicio(servicio:Servi){
    this._SesionServicio.quitarServicio(servicio);
    this.total=this._SesionServicio.getTotal();
  }

  pago() {
    //create Order en el servidor
    this.router.navigate(['/pago']);
  }
}
