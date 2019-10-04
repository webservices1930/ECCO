import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServicioService } from '../../servicios/servicio.service';
import { Servis } from '../../model/servis';
import { DomSanitizer } from '@angular/platform-browser';
import { Pregunta } from 'src/app/model/pregunta';
import { Usuario } from 'src/app/model/usuario';
import { SesionService } from '../../servicios/sesion.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent {
  pregunta:string;
  preguntar:boolean = false;

  preguntass:Pregunta[]=[];

  userid;
  servicioProveedorid;

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
               private _sesionService:SesionService,
               private router:Router
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

    this.activatedRoute.params.subscribe( params =>{
      console.log(params['id']);
      this._serviciosService.getServicioId(params['id']).then(res => {
          this.servicio=res[0];
          console.log(this.servicio);
          this.servicioProveedorid=res[0].nombreproveedor;
          this.userid = this._sesionService.id;
          console.log(this.userid + this.servicioProveedorid);
       });
    });
  }

public getSantizeUrl(img) {
  //console.log(img);
  //console.log(this.sanitization.bypassSecurityTrustUrl(img));
  return this.sanitization.bypassSecurityTrustUrl(img);
}

eliminar(){
  this._serviciosService.eliminarServicio(this.servicio.idx);
  this.router.navigate(['servicioss']);
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
