import { Injectable } from '@angular/core';
import { Servi } from './servicio.service';
import { Servis } from '../model/servis';

@Injectable()
export class SesionService {
    private servicios:Servis[] =[];
    private total:number[] = [];
    private sesion = "usuario";
    agregarServicio(servicio:Servi){
        this.servicios.push(servicio);
        if(this.total.length===0){
            this.total[0]=servicio.costo;
        }else{
            this.total[0]+=servicio.costo;
        }

        console.log(this.servicios);
        console.log(this.total);
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
            }
        }
    }
    getSesion(){
      return this.sesion;
    }
}
