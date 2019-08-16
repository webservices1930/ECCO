import { Component, OnInit } from '@angular/core';
import { ServiciossComponent } from '../../servicioss/servicioss.component';
import { Servi } from 'src/app/servicios/servicio.service';
import { SesionService } from 'src/app/servicios/sesion.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  servicios:Servi[]=[];
  total:number[]=[];
  constructor(private _SesionServicio:SesionService) { }

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
}
