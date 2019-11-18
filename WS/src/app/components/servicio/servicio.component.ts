import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServicioService } from '../../servicios/servicio.service';
import { Servis } from '../../model/servis';
import { DomSanitizer } from '@angular/platform-browser';
import { Pregunta } from 'src/app/model/pregunta';
import { Usuario } from 'src/app/model/usuario';
import { SesionService } from '../../servicios/sesion.service';
import { PreguntaService } from 'src/app/servicios/pregunta.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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
  preguntasCargadas: boolean;



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
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  );
  servicio=[];


    private appId: string;
    private appCode: string;
    public weather: any;

  constructor(private activatedRoute: ActivatedRoute,
    private _serviciosService: ServicioService,
    private sanitization: DomSanitizer,
    private _sesionService: SesionService,
    private router: Router,
    private _preguntaService: PreguntaService,
    private http: HttpClient
  ) {
    this.appId = "DHdAP2csCaXmWs7BqkdI";
    this.appCode = "1K1F8fwfcgvcJG0Y0nx6kg";
    this.weather = [];
  }

  ngOnInit() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            this.getWeather(position.coords);
        });
    } else {
        console.error("The browser does not support geolocation...");
    }


    this.preguntasCargadas = false;
    this.activatedRoute.params.subscribe(params => {
      this.idServicio = params['id'];
      this.pregunta.idServicio = params['id'];
      if (this._sesionService.getSesion() == "usuario") {
        this.pregunta.cliente.nombreUsuario = this._sesionService.id;
      }
      console.log("holita "+params['id']);
      this._serviciosService.getServicioId(params['id']).subscribe(res => {
        console.log("entro");
        console.log(res);
        this.servicio[0] = res;
        this.servicioProveedorid = res.proveedor.id
        this.userid = this._sesionService.id;





        this._preguntaService.getPreguntasServicio(params['id']).subscribe(res => {
          this.preguntasCargadas = true;
          this.preguntass = res;
        });

      });


    });
  }
  public getWeather(coordinates: any) {
    console.log(coordinates);
    this.http.jsonp("https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&latitude=" + coordinates.latitude + "&longitude=" + coordinates.longitude + "&app_id=" + this.appId + "&app_code=" + this.appCode, "jsonpCallback")
    .pipe(map(result => (<any>result).dailyForecasts.forecastLocation))
    .subscribe(result => {
        this.weather = result.forecast;
    }, error => {
        console.error(error);
    });

  }

  public getSantizeUrl() {
    let image = "data:image/.jpg;base64, "+this.servicio[0].foto;
    return this.sanitization.bypassSecurityTrustUrl(image);
 }

  eliminar() {
    this._serviciosService.eliminarServicio(this.servicio[0]).subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['servicioss']);

      },
      errors=>{
        console.log(errors);
      }
    )
  }

  editar() {
    this.activatedRoute.params.subscribe(params => {
      this.router.navigate(['/editarservicio', params['id']]);
    });
  }

  hacerPregunta() {
    //Aquí se debe enviar la pregunta al servicio
    if (this.pregunta.cliente.nombreUsuario == undefined) {
      this.autenticadoComoCliente = false;
    }
    else {
      console.log(this.pregunta.cliente.nombreUsuario);
      console.log(this.pregunta.idServicio);
      this._preguntaService.crearPregunta(this.pregunta).subscribe(res => {

      });
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
    this._preguntaService.agregarRespuesta(this.preguntass[i]).subscribe(res => {

    });;
    this.actualizarPreguntas();
  }

  actualizarPreguntas() {
    this._preguntaService.getPreguntasServicio(this.idServicio).subscribe(res => {
      this.preguntass = res;
    });
  }



}
