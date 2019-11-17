
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
            descripcion : registerForm.value.descripcion,
            foto:registerForm.value.foto.foto,
            numeroPersonas : registerForm.value.numeropersonas,
            tipoComida : registerForm.value.tipocomida,
            cantidadPlatos : registerForm.value.cantidadplatos,
            proveedor : user
        });
      }else if(tipo=="Transporte"){
        const url = `${environment.baseUrl}/servicio/transporte/${user.id}`;
        return this.request.post(url, {
          nombre : registerForm.value.nombres,
          pais : registerForm.value.pais,
          ciudad : registerForm.value.ciudad,
          costo : registerForm.value.costo,
          idioma : registerForm.value.idioma,
          descripcion : registerForm.value.descripcion,
          foto:registerForm.value.foto.foto,
          numeroPersonas : registerForm.value.numeropersonas,
          empresa : registerForm.value.empresa,
          tipoTransporte : registerForm.value.tipotransporte,
          origen:registerForm.value.origen,
          destino:registerForm.value.destino,
          horaSalida:registerForm.value.horainicio,
          horaLlegada:registerForm.value.horafin,
          proveedor : user
      });
      }else if(tipo=="PaseoEcologico"){
        const url = `${environment.baseUrl}/servicio/paseoEcologico/${user.id}`;
        return this.request.post(url, {
          nombre : registerForm.value.nombres,
          pais : registerForm.value.pais,
          ciudad : registerForm.value.ciudad,
          costo : registerForm.value.costo,
          idioma : registerForm.value.idioma,
          descripcion : registerForm.value.descripcion,
          foto:registerForm.value.foto.foto,
          numeroPersonas : registerForm.value.numeropersonas,
          origen:registerForm.value.origen,
          destino:registerForm.value.destino,
          horaInicio:registerForm.value.horainicio,
          horaFin:registerForm.value.horafin,
          proveedor : user
      });
      }else if(tipo=="Alojamiento"){
        const url = `${environment.baseUrl}/servicio/alojamiento/${user.id}`;
        return this.request.post(url, {
          nombre : registerForm.value.nombres,
          pais : registerForm.value.pais,
          ciudad : registerForm.value.ciudad,
          costo : registerForm.value.costo,
          idioma : registerForm.value.idioma,
          descripcion : registerForm.value.descripcion,
          foto:registerForm.value.foto.foto,
          numeroPersonas : registerForm.value.numeropersonas,
          tipoAlojamiento: registerForm.value.tipoalojamiento,
          numeroHabitaciones: registerForm.value.numerohabitaciones,
          numeroBanos: registerForm.value.numerobanos,
          servicioLimpieza:registerForm.value.serviciolimpieza,
          servicioWifi:registerForm.value.serviciowifi,
          proveedor : user
      });
      }else{
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
          nombre :  servicio.nombres,
          pais :  servicio.pais,
          ciudad :  servicio.ciudad,
          costo :  servicio.costo,
          idioma :  servicio.idioma,
          descripcion :  servicio.descripcion,
          foto: servicio.foto.foto,
          numeroPersonas :  servicio.numeropersonas,
          tipoComida :  servicio.tipocomida,
          cantidadPlatos :  servicio.cantidadplatos,
          //proveedor:user
      });
    }else if(servicio.tipo=="Transporte"){
      const url = `${environment.baseUrl}/servicio/transporte/${servicio.id}`;
      return this.request.delete(url, {
        nombre :  servicio.nombres,
        pais :  servicio.pais,
        ciudad :  servicio.ciudad,
        costo :  servicio.costo,
        idioma :  servicio.idioma,
        descripcion :  servicio.descripcion,
        foto: servicio.foto.foto,
        numeroPersonas :  servicio.numeropersonas,
        empresa :  servicio.tipocomida,
        tipoTransporte :  servicio.tipotransporte,
        origen: servicio.origen,
        destino: servicio.destino,
        horaSalida: servicio.horainicio,
        horaLlegada: servicio.horafin,
        //proveedor : user
    });
    }else if(servicio.tipo=="PaseoEcologico"){
      const url = `${environment.baseUrl}/servicio/paseoEcologico/${servicio.id}`;
      return this.request.delete(url, {
        nombre :  servicio.nombres,
        pais :  servicio.pais,
        ciudad :  servicio.ciudad,
        costo :  servicio.costo,
        idioma :  servicio.idioma,
        descripcion :  servicio.descripcion,
        foto: servicio.foto.foto,
        numeroPersonas :  servicio.numeropersonas,
        origen: servicio.origen,
        destino: servicio.destino,
        horaInicio: servicio.horainicio,
        horaFin: servicio.horafin,
        //proveedor : user
    });
    }else if(servicio.tipo=="Alojamiento"){
      const url = `${environment.baseUrl}/servicio/alojamiento/${servicio.id}`;
      return this.request.delete(url, {
        nombre :  servicio.nombres,
        pais :  servicio.pais,
        ciudad :  servicio.ciudad,
        costo :  servicio.costo,
        idioma :  servicio.idioma,
        descripcion :  servicio.descripcion,
        foto: servicio.foto.foto,
        numeroPersonas :  servicio.numeropersonas,
        tipoAlojamiento:  servicio.tipoalojamiento,
        numeroHabitaciones:  servicio.numerohabitaciones,
        numeroBanos:  servicio.numerobanos,
        servicioLimpieza: servicio.serviciolimpieza,
        servicioWifi: servicio.serviciowifi,
        //proveedor : user
    });
    }else{
      return this.request.delete('', {});
    }
  }

  getServicio( idx: string ){
    return this.servicios[idx];
  }

  getServicioProveedor(idProveedor){
    const url = `${environment.baseUrl}/usuario/proveedor/${idProveedor}/services"`;
    return this.request.get<any>(url);
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
