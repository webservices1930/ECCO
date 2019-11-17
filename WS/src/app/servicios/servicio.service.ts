
import { Injectable } from '@angular/core';
import {xmlToJson} from './lib';
import { Servis } from '../model/servis';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';
import { RequestService } from '../Request/request.service';
import { UsuarioService } from './usuario.service';
import { ProveedorService } from './proveedor.service';

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

  constructor(private request: RequestService,        private proveedorService:ProveedorService)    {
    this.getTodosServicios().subscribe(res => {
      this.serviciosCopia = res;
      this.servicios = res;
    });
  }

  updateServicio(servicio, base64data, tipo) {


  }


  crearServicio(registerForm,tipo,user){

      if(tipo=="Alimentacion"){
        const url = `${environment.baseUrl}/servicio/alimentacion/${user.id}`;
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
            proveedor : user
        });
      }else if(tipo=="Transporte"){
        return this.request.post('', {});
      }else if(tipo=="PaseoEcologico"){
        return this.request.post('', {});
      }else if(tipo=="Alojamiento"){
        return this.request.post('', {});
      }
    

  }


//Busca en TODOS los servicios
getServicioId(id){
    const url = `${environment.baseUrl}/servicio/${id}`;
      return this.request.get<Servis>(url);
}

 getTodosServicios(){
      const url = `${environment.baseUrl}/servicio`;
      return this.request.get<Servis[]>(url);
 }

  eliminarServicio(servicio){
    if(servicio.tipo=="Alimentacion"){
      const url = `${environment.baseUrl}/servicio/alimentacion/${servicio.id}`;
        return this.request.delete(url, {
          nombre : servicio.nombres,
          pais : servicio.pais,
          ciudad : servicio.ciudad,
          costo : servicio.costo,
          idioma : servicio.idioma,
          descripcion : servicio.foto,
          numeroPersonas : servicio.numeropersonas,
          tipoComida : servicio.tipocomida,
          cantidadPlatos : servicio.cantidadplatos,
          proveedor : servicio.proveedor
      });
    }else if(servicio.tipo=="Transporte"){
      return this.request.post('', {});
    }else if(servicio.tipo=="PaseoEcologico"){
      return this.request.post('', {});
    }else if(servicio.tipo=="Alojamiento"){
      return this.request.post('', {});
    }
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
