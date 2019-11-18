import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ServicioService } from '../../servicios/servicio.service';
import { SesionService } from '../../servicios/sesion.service';
import { Servis } from '../../model/servis';
import { MapsAPILoader } from '@agm/core';
import { ProveedorService } from '../../servicios/proveedor.service';

@Component({
  selector: 'app-crearservicio',
  templateUrl: './crearservicio.component.html',
  styleUrls: ['./crearservicio.component.css']
})
export class CrearservicioComponent implements OnInit {

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
  origen = "Origen";
  destino = "Destino";

  private geoCoder;

  @ViewChild('search', null)
  public searchElementRef: ElementRef;


  registerForm: FormGroup;
  loading = false;
  submitted = false;

  url = '';
  id = '';


  base64data: string;
  ext : string;
  image :string;

  user;

  tipoServicio="";
  tipoTransporte="";
  tipoAlojamiento="";
  serviciolimpieza="";
  serviciowifi="";
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private sanitization:DomSanitizer,
      private servicioService:ServicioService,
      private sesionService:SesionService,
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
      private proveedorService:ProveedorService
  ) {
    this.base64data=" ";
     this.ext=" ";
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

    this.setCurrentLocation();
    this.registerForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      pais: ['', Validators.required],
      ciudad: ['', Validators.required],
      idioma:['', Validators.required],
      descripcion:['', Validators.required],
      costo:['', Validators.required],
      foto:['',Validators.required],
      tipo:['', Validators.required],
      numeropersonas:[],
      tipocomida:[],
      cantidadplatos:[],
      origen:[],
      destino:[],
      horainicio:[],
      horafin:[],
      empresa:[],
      tipotransporte:[],
      numerohabitaciones: [],
      numerobanos: [],
      tipoalojamiento: [],
      serviciolimpieza: [],
      serviciowifi: []
  });
    this.user = this.sesionService.id;
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

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if(this.registerForm.invalid){
      alert("Ingrese todos los campos por favor");
    }else{
      this.proveedorService.getProveedorByUsernameJSON(this.user).subscribe( res => {
        console.log(res);
        this.servicioService.crearServicio(this.registerForm,this.tipoServicio,res,this.base64data, this.latitude, this.longitude, this.latitude1, this.longitude1,this.latitude2,this.longitude2, this.placeid).subscribe(
          results => {
            console.log(results);
            this.router.navigate(['servicioss']);
            alert("Se creó el servicio satisfactoriamente");

          },
          error => {
            console.error(error);
            alert("No se creó el servicio. Por favor intente nuevamente");
          }
        )

      });

    }
  }

  moverMarcador($event: any) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);

  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsBinaryString(event.target.files[0]);
      this.ext=event.target.files[0].type;
      reader.onload = (event) => { // called once readAsDataURL is completed
            this.base64data=btoa(reader.result as string);
      }
    }
  }
}
