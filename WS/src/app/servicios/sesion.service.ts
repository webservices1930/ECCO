import { Injectable } from '@angular/core';
import { Servi } from './servicio.service';

@Injectable()
export class SesionService {
    private servicios:Servi[] =[];
    
    agregarServicio(servicio:Servi){
        this.servicios.push(servicio);
    }
    getServicios():Servi[]{
        return this.servicios;
    }

    quitarServicio(servicio:Servi){
        for(var i=0;i<this.servicios.length;i++) {
            if(this.servicios[i].nombre === servicio.nombre){
                this.servicios.splice(i, 1); 
            }
        }
    }
}