
import { Injectable } from '@angular/core';

@Injectable()
export class ServicioService {

  private servicios:Servi[] = [
    {
      nombre: "Qiu Hotel Sukhumvit",
      bio: "Está a solo 3 minutos a pie de la estación de tren aéreo BTS de On Nut. Ofrece habitaciones amplias con TV vía satélite, una pileta al aire libre y WiFi gratis.",
      img: "assets/img/hotelPrueba.jpg",
      aparicion: "Bangkok, Tailandia",
      casa:"DC"
    },
    {
      nombre: "Hotel Presidente",
      bio: "Hotel Presidente tiene como objetivo conseguir que tu visita sea lo más relajante y agradable posible, razón por la que tantos huéspedes siguen volviendo año tras año.",
      img: "assets/img/hotelPrueba2.jpg",
      aparicion: "Benidorm, España",
      casa:"Marvel"
    },
    {
      nombre: "L Hotel",
      bio:"Ideal para disfrutar de unas vacaciones en familia y conocer uno de los destinos turísticos más importantes del Mediterráneo",
      img: "assets/img/hotelPrueba3.jpg",
      aparicion: "Islas canarias, España",
      casa: "Marvel"
    },
  ];

  constructor() {
    console.log("Servicio listo para usar!!!");
  }


  getServicios():Servi[]{
    return this.servicios;
  }

  getServicio( idx: string ){
    return this.servicios[idx];
  }

  buscarServicios( termino:string ):Servi[]{

    let serviciosArr:Servi[] = [];
    termino = termino.toLowerCase();

    for( let i = 0; i < this.servicios.length; i ++ ){

      let servicio = this.servicios[i];

      let nombre = servicio.nombre.toLowerCase();

      if( nombre.indexOf( termino ) >= 0  ){
        servicio.idx = i;
        serviciosArr.push( servicio )
      }

    }

    return serviciosArr;

  }


}


export interface Servi{
  nombre: string;
  bio: string;
  img: string;
  aparicion: string;
  casa: string;
  idx?: number;
};
