import { Injectable } from '@angular/core';
import { Servis } from '../model/servis';
import {xmlToJson} from './lib';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestService } from '../Request/request.service';

@Injectable()
export class SesionService {
    private servicios:Servis[] =[];
    private total:number[] = [];

    id = this.getUserLoggedIn();
    sesion = this.getUserTypeLoggedIn();

    sesionCambio: Subject<string> = new Subject<string>();
    idCambio: Subject<string> = new Subject<string>();

    constructor(private request:RequestService){

        //this.sesion;
        //this.sesionCambio.next(this.sesion);

        //this.id = "";
        //this.idCambio.next(this.id);
    }


    agregarServicio(servicio:Servis){
        this.servicios.push(servicio);
        if(this.total.length===0){
            this.total[0]=servicio.costo;
        }else{
            this.total[0]+=servicio.costo;
        }

    }
    getServicios():Servis[]{
        return this.servicios;
    }
    getTotal(){
        return this.total;
    }
    quitarServicio(servicio:Servis){
        for(var i=0;i<this.servicios.length;i++) {
            if(this.servicios[i].nombre === servicio.nombre){
                this.servicios.splice(i, 1);
                this.total[0]-=servicio.costo;
                break;
            }
        }
    }
    getSesion(){
      return this.sesion;
    }

    setSesion(x){
      this.sesion = x;
    }

    setServicios(servicios){
      this.servicios = servicios;
    }

    reiniciarCarrito(){
      this.servicios = [];
      this.total = [];
      this.total[0] = 0;
    }

    login(usuario,contrasena){
       const url = `${environment.baseUrl}/usuario/login`;
        return this.request.post<any>(url, {
          nombreUsuario: usuario,
          contrasena:contrasena,
        });
    }

  loginSatisfactorio(id,tipo){
    this.id = id;
    this.sesion =  tipo;
    localStorage.setItem('currentUser', id);
    localStorage.setItem('currentType', tipo);

  }
  getUserLoggedIn() {
      return localStorage.getItem('currentUser')||'';
  }
  getUserTypeLoggedIn() {
    return localStorage.getItem('currentType')||'sininiciar';
  }
}
