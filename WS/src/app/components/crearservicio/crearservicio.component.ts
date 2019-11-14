import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ServicioService } from '../../servicios/servicio.service';
import { SesionService } from '../../servicios/sesion.service';
import { Servis } from '../../model/servis';

@Component({
  selector: 'app-crearservicio',
  templateUrl: './crearservicio.component.html',
  styleUrls: ['./crearservicio.component.css']
})
export class CrearservicioComponent implements OnInit {

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
      private sesionService:SesionService
  ) {
    this.base64data=" ";
     this.ext=" ";
  }

  ngOnInit() {
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

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if(this.registerForm.invalid){
      alert("Ingrese todos los campos por favor");
    }else{
      this.servicioService.crearServicio(this.registerForm,this.tipoServicio,this.user).subscribe(
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
    }
  }

  cambiar(){
    //console.log(this.tipoServicio);
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
