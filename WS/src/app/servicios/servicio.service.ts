
import { Injectable } from '@angular/core';
import {xmlToJson} from './lib';
import { Servis } from '../model/servis';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';
import { RequestService } from '../Request/request.service';
import { UsuarioService } from './usuario.service';
import { ProveedorService } from './proveedor.service';
import { HttpClient } from '@angular/common/http';

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

  constructor(private request: RequestService,        private proveedorService:ProveedorService,private http: HttpClient)    {
    this.getTodosServicios().subscribe(res => {
      this.serviciosCopia = res;
      this.servicios = res;
    });
  }

  updateServicio(servicio, latitude, longitude, latitude1, longitude1, latitude2, longitude2, placeid) {
    console.log(servicio);
    if(servicio.tipo=="Alimentacion"||servicio.tipo=="alimentacion"){
      const url = `${environment.baseUrl}/servicio/alimentacion/${servicio.id}`;
        return this.request.put(url, {
          nombre : servicio.nombre,
          pais : servicio.pais,
          ciudad : servicio.ciudad,
          costo : servicio.costo,
          idioma : servicio.idioma,
          descripcion : servicio.descripcion,
          foto:servicio.foto,
          numeroPersonas : servicio.numeroPersonas,
          tipoComida : servicio.tipoComida,
          cantidadPlatos : servicio.cantidadPlatos,
          proveedor : servicio.proveedor,
          latitud: latitude,
          longitud: longitude,
          placeid: placeid
      });
    }else if(servicio.tipo=="Transporte"||servicio.tipo=="transporte"){
      const url = `${environment.baseUrl}/servicio/transporte/${servicio.id}`;
      return this.request.put(url, {
        nombre : servicio.nombre,
        pais : servicio.pais,
        ciudad : servicio.ciudad,
        costo : servicio.costo,
        idioma : servicio.idioma,
        descripcion : servicio.descripcion,
        foto:servicio.foto,
        numeroPersonas : servicio.numeroPersonas,
        empresa : servicio.empresa,
        tipoTransporte : servicio.tipoTransporte,
        origen:servicio.origen,
        destino:servicio.destino,
        horaSalida:servicio.horaSalida,
        horaLlegada:servicio.horaLlegada,
        proveedor : servicio.proveedor,
        latitudOrigen: latitude1,
        longitudOrigen: longitude1,
        latitudDestino: latitude2,
        longitudDestino: longitude2
    });
    }else if(servicio.tipo=="PaseoEcologico"||servicio.tipo=="paseoEcologico"){
      const url = `${environment.baseUrl}/servicio/paseoEcologico/${servicio.id}`;
      return this.request.put(url, {
        nombre : servicio.nombre,
        pais : servicio.pais,
        ciudad : servicio.ciudad,
        costo : servicio.costo,
        idioma : servicio.idioma,
        descripcion : servicio.descripcion,
        foto:servicio.foto,
        numeroPersonas : servicio.numeroPersonas,
        origen:servicio.origen,
        destino:servicio.destino,
        horaInicio:servicio.horaInicio,
        horaFin:servicio.horaFin,
        proveedor : servicio.proveedor,
        latitudOrigen: latitude1,
        longitudOrigen: longitude1,
        latitudDestino: latitude2,
        longitudDestino: longitude2
    });
    }else if(servicio.tipo=="Alojamiento"||servicio.tipo=="alojamiento"){
      const url = `${environment.baseUrl}/servicio/alojamiento/${servicio.id}`;
      return this.request.put(url, {
        nombre : servicio.nombre,
        pais : servicio.pais,
        ciudad : servicio.ciudad,
        costo : servicio.costo,
        idioma : servicio.idioma,
        descripcion : servicio.descripcion,
        foto:servicio.foto,
        numeroPersonas : servicio.numeroPersonas,
        tipoAlojamiento: servicio.tipoAlojamiento,
        numeroHabitaciones: servicio.numeroHabitaciones,
        numeroBanos: servicio.numeroBanos,
        servicioLimpieza:servicio.servicioLimpieza,
        servicioWifi:servicio.servicioWifi,
        proveedor : servicio.proveedor,
        latitud: latitude,
        longitud: longitude,
        placeId: placeid
    });
    }else{
      return this.request.put('', {});
    }

  }


  crearServicio(registerForm,tipo,user,fotico,latitude,longitude,latitude1,longitude1,latitude2,longitude2, placeid){
      if(tipo=="Alimentacion"){
        const url = `${environment.baseUrl}/servicio/alimentacion/${user.id}`;
          return this.request.post(url, {
            nombre : registerForm.value.nombres,
            pais : registerForm.value.pais,
            ciudad : registerForm.value.ciudad,
            costo : registerForm.value.costo,
            idioma : registerForm.value.idioma,
            descripcion : registerForm.value.descripcion,
            foto:fotico,
            numeroPersonas : registerForm.value.numeropersonas,
            tipoComida : registerForm.value.tipocomida,
            cantidadPlatos : registerForm.value.cantidadplatos,
            proveedor : user,
            latitud : latitude,
            longitud: longitude,
            placeId: placeid
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
          foto:fotico,
          numeroPersonas : registerForm.value.numeropersonas,
          empresa : registerForm.value.empresa,
          tipoTransporte : registerForm.value.tipotransporte,
          origen:registerForm.value.origen,
          destino:registerForm.value.destino,
          horaSalida:registerForm.value.horainicio,
          horaLlegada:registerForm.value.horafin,
          proveedor : user,
          latitudOrigen: latitude1,
          longitudOrigen: longitude1,
          latitudDestino: latitude2,
          longitudDestino: longitude2
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
          foto:fotico,
          numeroPersonas : registerForm.value.numeropersonas,
          origen:registerForm.value.origen,
          destino:registerForm.value.destino,
          horaInicio:registerForm.value.horainicio,
          horaFin:registerForm.value.horafin,
          proveedor : user,
          latitudOrigen: latitude1,
          longitudOrigen: longitude1,
          latitudDestino: latitude2,
          longitudDestino: longitude2
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
          foto:fotico,
          numeroPersonas : registerForm.value.numeropersonas,
          tipoAlojamiento: registerForm.value.tipoalojamiento,
          numeroHabitaciones: registerForm.value.numerohabitaciones,
          numeroBanos: registerForm.value.numerobanos,
          servicioLimpieza:registerForm.value.serviciolimpieza,
          servicioWifi:registerForm.value.serviciowifi,
          proveedor : user,
          latitud : latitude,
          longitud: longitude,
          placeId: placeid
      });
      }else{
        return this.request.post('', {});
      }
  }


//Busca en TODOS los servicios
getServicioId(id){
    const url = `${environment.baseUrl}/servicio/${id}`;
      return this.request.get<any>(url);
}

 getTodosServicios(){
      const url = `${environment.baseUrl}/servicio`;
      return this.request.get<any[]>(url);
 }

  eliminarServicio(servicio){
    console.log(servicio);
      const url = `${environment.baseUrl}/servicio/${servicio.id}`;
        return this.http.delete<any>(url);

  }

  getServicio( idx: string ){
    return this.servicios[idx];
  }

  getServicioProveedor(idProveedor){
    console.log("xxxx "+idProveedor);
    const url = `${environment.baseUrl}/usuario/proveedor/${idProveedor}/services`;
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
