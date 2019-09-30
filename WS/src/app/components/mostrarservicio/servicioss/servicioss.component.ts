import { Component, OnInit } from '@angular/core';
import { ServicioService, Servi } from '../../../servicios/servicio.service';
import { Router } from '@angular/router';
import {xmlToJson} from '../../../servicios/lib';
import { Servis } from '../../../model/servis';


@Component({
  selector: 'app-servicioss',
  templateUrl: './servicioss.component.html'
})
export class ServiciossComponent implements OnInit {
  seleccionados:Servis[]=[];
  servicios;
  serviciosAuxiliar:Servis[]=[];
  serviciosCopia: any= [];
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

  constructor( private _serviciosService:ServicioService,
               private router:Router
                ) {
  }

   ngOnInit() {
     this._serviciosService.getServiciosJSON().then(res => {
        this.serviciosCopia = res;
        this.servicios = res;
     });
  }

  verServicio( idx:number ){
    this.router.navigate( ['/servicio',idx] );
  }

  addProductoCarrito(servicio:Servis){
    this.seleccionados.push(servicio);
  }


  buscarServicio( termino:string ){
     console.log(termino);
        var i=0;
        this.serviciosCopia=[];
        console.log(this.servicios);
        this.servicios.forEach(element => {
          if(element.tipo.toLocaleLowerCase() === termino.toLocaleLowerCase() || termino===""){
            this.serviciosCopia.push(element);
          }
          i++;
        });
    }


}
