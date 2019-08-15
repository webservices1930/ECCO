import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { ServicioService } from '../../servicios/servicio.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html'
})
export class ServicioComponent {

  servicio:any = {};


  constructor( private activatedRoute: ActivatedRoute,
               private _serviciosService: ServicioService
    ){

    this.activatedRoute.params.subscribe( params =>{
        this.servicio = this._serviciosService.getServicio( params['id'] );
    });

  }

}
