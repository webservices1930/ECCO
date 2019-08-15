import { Component, OnInit } from '@angular/core';
import { ServicioService, Servi } from '../../servicios/servicio.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-servicioss',
  templateUrl: './servicioss.component.html'
})
export class ServiciossComponent implements OnInit {
  seleccionados:Servi[]=[];
  servicios:Servi[] = [];

  constructor( private _serviciosService:ServicioService,
               private router:Router
                ) {
    // console.log("constructor");
  }

  ngOnInit() {
    this.servicios = this._serviciosService.getServicios();
     console.log( this.servicios );
  }

  verServicio( idx:number ){
    this.router.navigate( ['/servicio',idx] );
  }

  addProductoCarrito(servicio:Servi){
    this.seleccionados.push(servicio);
  }
}
