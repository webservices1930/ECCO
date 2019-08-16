import { Injectable } from '@angular/core';
import { Servi } from './servicio.service';

@Injectable()
export class SesionService {
    private servicios:Servi[] =[];
    private total:number[] = [];
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
    getServicios():Servi[]{
        return this.servicios;
    }
    getTotal(){
        return this.total;
    }
    quitarServicio(servicio:Servi){
        for(var i=0;i<this.servicios.length;i++) {
            if(this.servicios[i].nombre === servicio.nombre){
                this.servicios.splice(i, 1); 
                this.total[0]-=servicio.costo;
            }
        }
    }
}