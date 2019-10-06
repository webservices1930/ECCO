import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../../servicios/servicio.service';
import { Router } from '@angular/router';
import {xmlToJson} from '../../../servicios/lib';
import { Servis } from '../../../model/servis';


@Component({
  selector: 'app-servicioss',
  templateUrl: './servicioss.component.html',
  styleUrls: ['./servicioss.component.css']
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
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  );

  constructor( private _serviciosService:ServicioService,
               private router:Router
                ) {
  }

   ngOnInit() {
     this._serviciosService.getTodosServicios().then(res =>{
      this.serviciosCopia= res;
      this.servicios=res;
      console.log(this.serviciosCopia);
     });
  }

  verServicio( idx:number ){
    this.router.navigate( ['/servicio',idx] );
  }

  addProductoCarrito(servicio:Servis){
    this.seleccionados.push(servicio);
  }


  filtrarServicio( termino:string ){
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

    buscarServicio( termino:string ){
      console.log(termino);
      this.router.navigate( ['/buscar',termino] );
    }


}
