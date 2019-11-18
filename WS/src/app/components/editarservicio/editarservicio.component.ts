import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SesionService } from 'src/app/servicios/sesion.service';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-editarservicio',
  templateUrl: './editarservicio.component.html',
  styleUrls: ['./editarservicio.component.css']
})
export class EditarservicioComponent implements OnInit {
  servicio=[];
  servicioid;
  userid;
  servicioProveedorid;
  base64data: string;
  ext : string;
  image :string;


  title: string = 'Prueba mapa';
  latitude: number;
  longitude: number;

  placeid: string;
  zoom: number;
  address: string;

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

  constructor( private activatedRoute: ActivatedRoute,
    private _serviciosService: ServicioService,
    private sanitization:DomSanitizer,
    private _sesionService:SesionService,
    private router:Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
){

}

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.latitude1 = place.geometry.location.lat();
          this.longitude1 = place.geometry.location.lng() + 0.003;
          this.latitude2 = place.geometry.location.lat();
          this.longitude2 = place.geometry.location.lng() - 0.003;
          this.placeid = place.place_id;
          this.zoom = 12;
        });
      });
    });

    //this.setCurrentLocation();

    this.activatedRoute.params.subscribe( params =>{
      this.servicioid = params['id'];
      this._serviciosService.getServicioId(params['id']).subscribe(res => {
          this.servicio[0]=res;
          console.log(this.servicio[0]);
          this.userid = this._sesionService.id;
       });
    });
  }

  regresar(){
    this.router.navigate( ['/servicio', this.servicioid] );
  }

  public getSantizeUrl() {
    let image = "data:image/.jpg;base64, "+this.servicio[0].foto;
    return this.sanitization.bypassSecurityTrustUrl(image);
 }
 onSelectFile(event) { // called each time file input changes
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    this.ext=event.target.files[0].type;
    reader.onload = (event) => { // called once readAsDataURL is completed
        this.servicio[0].foto=btoa(reader.result as string);
      }
    }
  }
  guardar(){
    this._serviciosService.updateServicio(this.servicio[0], this.latitude, this.longitude, this.latitude1, this.longitude1,this.latitude2,this.longitude2, this.placeid).subscribe(
      results => {
        console.log(results);
        this.router.navigate(['servicioss']);
        alert("Se actualizó el servicio satisfactoriamente");

      },
      error => {
        console.error(error);
        alert("No se actualizó el servicio. Por favor intente nuevamente");
      }
    )

  }


  private setCurrentLocation(){
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.latitude1 = position.coords.latitude;
        this.longitude1 = position.coords.longitude + 0.003;
        this.latitude2 = position.coords.latitude;
        this.longitude2 = position.coords.longitude - 0.003;
        this.zoom = 15;
      });
    }
  }

  markerDragEnd($event: any) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  markerDragEnd1($event: any) {
    console.log($event);
    this.latitude1 = $event.coords.lat;
    this.longitude1 = $event.coords.lng;
    this.getAddress1(this.latitude1, this.longitude1);
  }

  markerDragEnd2($event: any) {
    console.log($event);
    this.latitude2 = $event.coords.lat;
    this.longitude2 = $event.coords.lng;
    this.getAddress2(this.latitude2, this.longitude2);
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

  getAddress1(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address1 = results[0].formatted_address;
          this.placeid1 = results[0].place_id;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  getAddress2(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address2 = results[0].formatted_address;
          this.placeid2 = results[0].place_id;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  moverMarcador($event: any) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);

  }


}
