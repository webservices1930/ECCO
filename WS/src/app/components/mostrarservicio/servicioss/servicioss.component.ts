import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../../servicios/servicio.service';
import { Router } from '@angular/router';
import {xmlToJson} from '../../../servicios/lib';
import { Servis } from '../../../model/servis';
import { TarjetaCarritoService } from '../../../servicios/tarjeta-carrito.service';
import { RequestService } from '../../../Request/request.service';
import { Usuario } from '../../../model/usuario';


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
               private router:Router,
               private tarjetaCarritoService: TarjetaCarritoService,
               private request: RequestService) {
  }

   ngOnInit() {
     this._serviciosService.getTodosServicios().subscribe(res =>{
      this.serviciosCopia= res;
      this.servicios=res;
     });
     //this.tarjetaCarritoService.actualizarCarrito();

  }

  verServicio( idx:number ){
    this.router.navigate( ['/servicio',idx] );
  }

  addProductoCarrito(servicio:Servis){
    this.seleccionados.push(servicio);
  }


  filtrarServicio( termino:string ){
        var i=0;
        this.serviciosCopia=[];
        this.servicios.forEach(element => {
          if(element.tipo.toLocaleLowerCase() === termino.toLocaleLowerCase() || termino===""){
            this.serviciosCopia.push(element);
          }
          i++;
        });
    }

    buscarServicio( termino:string ){
      this.router.navigate( ['/buscar',termino] );
    }


}
