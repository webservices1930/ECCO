import { Pregunta } from './pregunta';
import { NumberSymbol } from '@angular/common';
import { Proveedor } from './proveedor';

export class Servis {
  constructor(
    public nombre: string,
    public pais: string,
    public ciudad:string,
    public idioma:string,
    public descripcion:string,
    public tipo:string,
    public costo:number,
    public foto: string,
    public proveedor:Proveedor,
    public Id?: number,

    public numeroPersonas?:number,


    //Servicio de alimentación:
    public tipoComida?:string,
    public cantidadPlatos?:number,

    //Servicio de paseo ecologico:
    public origen?:string,
    public destino?:string,
    public horaInicio?:string,
    public horaFinal?:string,

    //Servicio de transporte:
    public empresa?:string,
    public tipoTransporte?:string,
    /*public origen?:string,
    public destino?:string,*/
    public horaSalida?:string,
    public horaLlegada?:string,

    //servicio de alojamiento:
    public tipoAlojamiento?:string,
    public numeroHabitaciones?:number,
    public numeroBanos?:number,
    public servicioLimpieza?:string,
    public servicioWifi?:string





  ) {}
}
