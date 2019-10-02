import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { ServicioService } from '../../servicios/servicio.service';
import { Servis } from '../../model/servis';
import { DomSanitizer } from '@angular/platform-browser';
import { Pregunta } from 'src/app/model/pregunta';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent {
  pregunta:string;
  preguntar:boolean = false;

  preguntass:Pregunta[]=[];

  seleccionados:Servis[]=[];
  servicios;
  serviciosCopia:Servis[] = [];
  serv: Servis = new Servis (
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  );
  servicio;

  constructor( private activatedRoute: ActivatedRoute,
               private _serviciosService: ServicioService,
               private sanitization:DomSanitizer,
               private servicioService:ServicioService
    ){

  }

  ngOnInit(){

    //mock preguntas:
    let usuarioPregunta:Usuario= new Usuario("Nombre_Usuario", undefined, undefined, undefined, undefined, undefined, undefined, undefined);

    let preguntaPrueba:Pregunta = new Pregunta(usuarioPregunta, "¿Hay Wi-Fi?", "Sí");

    this.preguntass.push(preguntaPrueba);
    this.preguntass.push(preguntaPrueba);
    this.preguntass.push(preguntaPrueba);
    this.preguntass.push(preguntaPrueba);
    this.preguntass.push(preguntaPrueba);

    console.log(this.preguntass);


    //fin de mock de preguntas
/*
    this.activatedRoute.params.subscribe( params =>{
      console.log(params['id']);
      this._serviciosService.getServicioById(params['id']).then(res => {
          this.servicio=res;
          console.log(this.servicio);
      });
    });*/
  }

public getSantizeUrl(img) {
  //console.log(img);
  //console.log(this.sanitization.bypassSecurityTrustUrl(img));
  return this.sanitization.bypassSecurityTrustUrl(img);
}

hacerPregunta(){
  //Aquí se debe enviar la pregunta al servicio
  console.log(this.pregunta);
  this.pregunta = "";
  this.preguntar = false;
}
cancelarPregunta(){
  this.pregunta = "";
  this.preguntar = false;
}


}
