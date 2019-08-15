import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from '../../servicios/servicio.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html'
})
export class BuscadorComponent implements OnInit {

  servicios:any[] = []
  termino:string;

  constructor( private activatedRoute:ActivatedRoute,
              private _serviciosService: ServicioService) {

  }

  ngOnInit() {

    this.activatedRoute.params.subscribe( params =>{
      this.termino =params['termino'];
      this.servicios = this._serviciosService.buscarServicios( params['termino'] );
      console.log( this.servicios );
    });

  }

}
