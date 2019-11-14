
import { Injectable } from '@angular/core';
import {xmlToJson} from './lib';
import { Servis } from '../model/servis';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';
import { RequestService } from '../Request/request.service';
import { UsuarioService } from './usuario.service';

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

  constructor(private request: RequestService,    private usuarioService:UsuarioService) {
    this.getTodosServicios().subscribe(res => {
      this.serviciosCopia = res;
      this.servicios = res;
    });
  }

  updateServicio(servicio, base64data, tipo) {


  }


  crearServicio(registerForm,tipo,iduser){
      if(tipo=="Alimentacion"){
        const url = `${environment.baseUrl}/servicio/alimentacion/${iduser}`;
        return this.request.post(url, {
          nombre : registerForm.value.nombres,
          pais : registerForm.value.pais,
          ciudad : registerForm.value.ciudad,
          costo : registerForm.value.costo,
          idioma : registerForm.value.idioma,
          descripcion : registerForm.value.foto,
          numeroPersonas : registerForm.value.numeropersonas,
          tipoComida : registerForm.value.tipocomida,
          cantidadPlatos : registerForm.value.cantidadplatos,
        });
      }else if(tipo=="Transporte"){
        return this.request.post('', {});
      }else if(tipo=="PaseoEcologico"){
        return this.request.post('', {});
      }else if(tipo=="Alojamiento"){
        return this.request.post('', {});
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
