
import { Injectable } from '@angular/core';
import {xmlToJson} from './lib';
import { Servis } from '../model/servis';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';
import { RequestService } from '../Request/request.service';

@Injectable()
export class ServicioService {

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
  serviciosCopia:any=[];
  servicios:any=[];

  serviciosAux:any=[];

  constructor(private request: RequestService) {
    this.getTodosServicios().subscribe(res => {
      this.serviciosCopia = res;
      this.servicios = res;
    });
  }

  updateServicio(servicio, base64data, tipo) {


  }


  crearServicio(servicio,base64data,ext,tipo,user){
      if(tipo=="Alimentacion"){
        const url = `${environment.baseUrl}/usuario/cliente`;
        return this.request.post(url, {

        });
      }else if(tipo=="Transporte"){

      }else if(tipo=="PaseoEcologico"){

      }else if(tipo=="Alojamiento"){

      }
  }


  async getServiciosAlimentacionJSON(){

  }



//Busca en TODOS los servicios
getServicioId(id){
    const url = `${environment.baseUrl}/servicio/${id}`;
    console.log('xddd');
      return this.request.get<Servis>(url);
}

 getTodosServicios(){
      const url = `${environment.baseUrl}/servicio`;
      return this.request.get<Servis[]>(url);
 }

  eliminarServicio(id){

  }

  getServicio( idx: string ){
    return this.servicios[idx];
  }

  buscarServicios( termino:string ):Servis[]{
    let serviciosArr:Servis[] = [];
    termino = termino.toLowerCase();
    this.servicios.forEach(element => {
        let servicio = element;
        let nombre = servicio.nombre.toLowerCase();
        if( nombre.indexOf( termino ) >= 0  ){
          serviciosArr.push( servicio );
        }
    });
    return serviciosArr;

  }


}
