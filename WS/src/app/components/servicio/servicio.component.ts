import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServicioService } from '../../servicios/servicio.service';
import { Servis } from '../../model/servis';
import { DomSanitizer } from '@angular/platform-browser';
import { Pregunta } from 'src/app/model/pregunta';
import { Usuario } from 'src/app/model/usuario';
import { SesionService } from '../../servicios/sesion.service';
import { PreguntaService } from 'src/app/servicios/pregunta.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent {
  pregunta: Pregunta = new Pregunta(
    new Usuario(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined),
    undefined,
    undefined,
    undefined,
    undefined
  );
  preguntar: boolean = false;
  reponder: boolean = false;
  autenticadoComoCliente: boolean = true;



  preguntass: any = [];

  userid;
  servicioProveedorid;
  idServicio;

  seleccionados: Servis[] = [];
  servicios;
  serviciosCopia: Servis[] = [];
  serv: Servis = new Servis(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  );
  servicio = [];

  constructor(private activatedRoute: ActivatedRoute,
    private _serviciosService: ServicioService,
    private sanitization: DomSanitizer,
    private _sesionService: SesionService,
    private router: Router,
    private _preguntaService: PreguntaService
  ) {

  }

  ngOnInit() {



    this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
      this.idServicio = params['id'];

      this.pregunta.idServicio = params['id'];
      if (this._sesionService.getSesion() == "usuario") {
        this.pregunta.cliente.email = this._sesionService.id;
      }

      this._serviciosService.getServicioId(params['id']).then(res => {
        this.servicio[0] = res[0];
        console.log(this.servicio[0]);
        this.servicioProveedorid = res[0].nombreproveedor;
        this.userid = this._sesionService.id;
        console.log(this.userid + this.servicioProveedorid);


        this._preguntaService.getPreguntasServicio(params['id']).then(res => {
          this.preguntass = res;
        });

      });


    });
  }

  public getSantizeUrl(img) {
    //console.log(img);
    //console.log(this.sanitization.bypassSecurityTrustUrl(img));
    return this.sanitization.bypassSecurityTrustUrl(img);
  }

  eliminar() {
    this._serviciosService.eliminarServicio(this.servicio[0].idx);
    this.router.navigate(['servicioss']);
  }

  editar() {
    this.activatedRoute.params.subscribe(params => {
      this.router.navigate(['/editarservicio', params['id']]);
    });
  }

  hacerPregunta() {
    //Aquí se debe enviar la pregunta al servicio
    console.log(this.pregunta.pregunta);
    if (this.pregunta.cliente.email == undefined) {
      this.autenticadoComoCliente = false;
    }
    else {
      this._preguntaService.crearPregunta(this.pregunta);
      this.pregunta.pregunta = "";
      this.preguntar = false;
      this.actualizarPreguntas();
    }
  }
  cancelarPregunta() {
    this.pregunta.pregunta = "";
    this.preguntar = false;
  }

  responder(index: number) {
    for (let i = 0; i < this.preguntass.length; i++) {
      if (this.preguntass[i].responder) {
        this.preguntass[i].responder = false;
        this.preguntass[i].respuesta = '';
      }
      if (i == index)
        this.preguntass[i].responder = true;
    }
  }

  cancelarRespuesta(index: number) {
    this.preguntass[index].responder = false;
    this.preguntass[index].respuesta = '';
  }

  agregarRespuesta(i: number) {
    this._preguntaService.agregarRespuesta(this.preguntass[i]);
    this.actualizarPreguntas();
  }

  actualizarPreguntas() {
    this._preguntaService.getPreguntasServicio(this.idServicio).then(res => {
      this.preguntass = res;
    });
  }



}
