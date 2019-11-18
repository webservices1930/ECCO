import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
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
import { MapsAPILoader } from '@agm/core';
import { Pais } from '../../model/pais';
import { Resena } from 'src/app/model/resena';
import { ResenaService } from 'src/app/servicios/resena.service';

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
  resena: Resena = new Resena(
    new Usuario(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined),
    undefined,
    undefined,
    undefined,
    undefined
  );

  preguntar: boolean = false;
  resenar: boolean = false;
  reponder: boolean = false;
  autenticadoComoCliente: boolean = true;
  preguntasCargadas: boolean;
  resenasCargadas: boolean;


  ciudad="";
  preguntass: any = [];
  resenass: any = [];

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

  // aQUI VA LO DE MAPAS
  title: string = 'Prueba mapa';
  latitude: number;
  longitude: number;

  placeid: string;
  zoom: number;
  address: string;

  paisrec=[];

  //---------------
  latitude1: number;
  longitude1: number;
  placeid1: string;
  address1: string;
  latitude2: number;
  longitude2: number;
  placeid2: string;
  address2: string;
  alimentacion = "Servcio alimentación";
  alojamiento = "Servcio alojamiento";
  posicion = "Ubicación actual";
  origen = "Origen";
  destino = "Destino";

  private geoCoder;

  @ViewChild('search', null)
  public searchElementRef: ElementRef;



    private appId: string;
    private appCode: string;
    public weather: any;

    latitud;
    longitud;
    pais;

  constructor(private activatedRoute: ActivatedRoute,
    private _serviciosService: ServicioService,
    private sanitization: DomSanitizer,
    private _sesionService: SesionService,
    private _resenaService: ResenaService,
    private router: Router,
    private _preguntaService: PreguntaService,
    private http: HttpClient,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.appId = "DHdAP2csCaXmWs7BqkdI";
    this.appCode = "1K1F8fwfcgvcJG0Y0nx6kg";
    this.weather = [];
  }

  ngOnInit() {



    this.preguntasCargadas = false;
    this.resenasCargadas = false;
    this.activatedRoute.params.subscribe(params => {
      this.idServicio = params['id'];
      this.pregunta.idServicio = params['id'];
      this.resena.idServicio = params['id'];
      if (this._sesionService.getSesion() == "usuario") {
        this.pregunta.cliente.nombreUsuario = this._sesionService.id;
        this.resena.cliente.nombreUsuario = this._sesionService.id;
      }
      console.log("holita "+params['id']);
      this._serviciosService.getServicioId(params['id']).subscribe(res => {
        console.log("entro");
        console.log(res);
        this.servicio[0] = res;
        this.servicioProveedorid = res.proveedor.id
        this.userid = this._sesionService.id;
        this.pais = this.servicio[0].pais;

        if(this.servicio[0].tipo=="Alimentacion"||this.servicio[0].tipo=="alimentacion"){
          this.latitud=this.servicio[0].latitud;
          this.longitud=this.servicio[0].longitud;
          this.placeid = this.servicio[0].placeid;
        }else if(this.servicio[0].tipo=="Transporte"||this.servicio[0].tipo=="transporte"){
          this.latitud=this.servicio[0].latitudDestino;
          this.longitud=this.servicio[0].longitudDestino;
        }else if(this.servicio[0].tipo=="PaseoEcologico"||this.servicio[0].tipo=="paseoEcologico"){
          this.latitud=this.servicio[0].latitudDestino;
          this.longitud=this.servicio[0].longitudDestino;
        }else if(this.servicio[0].tipo=="Alojamiento"||this.servicio[0].tipo=="alojamiento"){
          this.latitud=this.servicio[0].latitud;
          this.longitud=this.servicio[0].longitud;
          this.placeid = this.servicio[0].placeid;
        }
        this.getWeather(this.latitud,this.longitud);
        this.getCountry(this.pais).subscribe(res => {
          this.paisrec[0] = new Pais(undefined, undefined, undefined, undefined, undefined, undefined, undefined);
          this.paisrec[0].nombre = res[0].name;
          this.paisrec[0].capital = res[0].capital;
          this.paisrec[0].region = res[0].region;
          this.paisrec[0].popultation = res[0].population;
          this.paisrec[0].area = res[0].area;
          this.paisrec[0].moneda = res[0].currencies[0].name;
          this.paisrec[0].codigo = res[0].currencies[0].code;
          console.log(res[0].currencies[0].name);
        });

        this._preguntaService.getPreguntasServicio(params['id']).subscribe(res => {
          this.preguntasCargadas = true;
          this.preguntass = res;
        });

        this._resenaService.getResenasServicio(params['id']).subscribe(res => {
          this.resenasCargadas = true;
          this.resenass = res;
        });

      });


    });
    this.setCurrentLocation();
  }
  public getWeather(latitud, longitud) {
    this.http.jsonp("https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&latitude=" + latitud + "&longitude=" + longitud + "&app_id=" + this.appId + "&app_code=" + this.appCode, "jsonpCallback")
    .pipe(map(result => (<any>result).dailyForecasts.forecastLocation))
    .subscribe(result => {
      console.log(result);
        this.ciudad = result.city + "," + result.state + "," + result.country;
        this.weather = result.forecast;
    }, error => {
        console.error(error);
    });

  }

  public getCountry(pais){
    const url = 'https://restcountries.eu/rest/v2/name/'+pais;
    return this.http.get<any>(url);
  }

  public getSantizeUrl() {
    let image = "data:image/.jpg;base64, "+this.servicio[0].foto;
    return this.sanitization.bypassSecurityTrustUrl(image);
 }

  eliminar() {
    this._serviciosService.eliminarServicio(this.servicio[0]).subscribe(
      res =>{
        console.log(res);
        alert("Se eliminó el servicio")
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
        this.actualizarPreguntas();
      });
      this.pregunta.pregunta = "";
      this.preguntar = false;
    }
  }



  hacerResena() {
    if (this.resena.cliente.nombreUsuario == undefined){
      this.autenticadoComoCliente = false;
    }
    else{
      this._resenaService.crearResena(this.resena).subscribe(res => {
        this.actualizarResenas();
      });
      this.resena.comentario = "";
      this.resenar = false;
    }

  }

  cancelarResena(){
    this.resena.comentario = "";
    this.resenar = false;
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
      this.actualizarPreguntas();
    });
  }

  actualizarPreguntas() {
    this._preguntaService.getPreguntasServicio(this.idServicio).subscribe(res => {
      this.preguntass = res;
    });
  }

  actualizarResenas(){
    this._resenaService.getResenasServicio(this.idServicio).subscribe(res => {
      this.resenass = res;
    });
  }

  private setCurrentLocation(){
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          this.placeid = results[0].place_id;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

}
