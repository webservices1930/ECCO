import { Component, OnInit } from '@angular/core';
import { ServicioService, Servi } from '../../servicios/servicio.service';
import { Router } from '@angular/router';
import {xmlToJson} from '../../servicios/lib';
import { Servis } from '../../model/servis';
import { inflate } from 'zlib';


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
    // console.log("constructor");
  }

   ngOnInit() {
     this._serviciosService.getServiciosJSON().then(res => {
        this.serviciosCopia = res;
        this.servicios = res;
        console.log(this.servicios);
      /*
        this.servicios.forEach(element => {
          this.serv = new Servis (
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
          );
          console.log(element['s0:nombre']['#text']);
          this.serv.nombre= element['s0:nombre']['#text'];
          this.serv.descripcion=element['s0:descripcion']['#text'];
          this.serv.costo=+element['s0:costo']['#text'];
          let inf= element['s0:foto']['#text'];
          this.serv.img="data:image/"+element['s0:tipo']['#text']+";base64, "+inf.slice(2,inf.length-1);
          this.serv.idx=element['s0:id']['#text'];
          this.serv.pais=element['s0:pais']['#text'];
          this.serv.ciudad=element['s0:ciudad']['#text'];
          this.serv.tipo="Alimentacion";
          this.serviciosCopia.push(this.serv);
          this.serviciosAuxiliar.push(this.serv);
        });*/
     });
/*

*/
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
            console.log("iguales");
            this.serviciosCopia.push(element);
          }
          i++;
        });
    }


}
