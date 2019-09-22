import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { ServicioService } from '../../servicios/servicio.service';
import { Servis } from '../../model/servis';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html'
})
export class ServicioComponent {
  seleccionados:Servis[]=[];
  servicios;
  serviciosCopia:Servis[] = [];
  serv: Servis = new Servis (
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  );
  servicio;

  constructor( private activatedRoute: ActivatedRoute,
               private _serviciosService: ServicioService,
               private sanitization:DomSanitizer
    ){

  }

  ngOnInit(){
    this.activatedRoute.params.subscribe( params =>{
      console.log(params['id']);
      this._serviciosService.getServiciosJSON().then(res => {
        this.servicios = res;
        this.servicios.forEach(element => {
          console.log(element);
          if(element.idx===params['id']){
            this.servicio=element;
          }
      });
    });
  });
}

public getSantizeUrl(img) {
  console.log(img);
  console.log(this.sanitization.bypassSecurityTrustUrl(img));
  return this.sanitization.bypassSecurityTrustUrl(img);
}


}
