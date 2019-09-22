import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

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

  proveedor:string = "randyD45";

  tipo="";
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private sanitization:DomSanitizer
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
        costo:['', Validators.required],
        descripcion:['', Validators.required],
        tipo:['', Validators.required],
        numeropersonas:[],
        tipocomida:[],
        cantidadplatos:[],

    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.value);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
    let sr='';
    if(this.tipo === 'Alimentacion'){
      console.log("si");
      sr='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service" xmlns:ser="servicios.soapServices">'+
      '<soapenv:Header/>'+
     '<soapenv:Body>'+
         '<djan:createServicioAlimentacion>'+
            '<!--Optional:-->'+
            '<djan:servicio>'+
               '<ser:nombre>'+this.registerForm.value.nombres+'</ser:nombre>'+
               '<ser:pais>'+this.registerForm.value.pais+'</ser:pais>'+
               '<ser:ciudad>'+this.registerForm.value.ciudad+'</ser:ciudad>'+
               '<ser:idioma>'+this.registerForm.value.idioma+'</ser:idioma>'+
               '<ser:costo>'+this.registerForm.value.costo+'</ser:costo>'+
               '<ser:descripcion>'+this.registerForm.value.descripcion+'</ser:descripcion>'+
               '<ser:foto>'+this.base64data+'</ser:foto>'+
               '<ser:tipo>'+this.ext+'</ser:tipo>'+
               '<ser:numeroPersonas>'+this.registerForm.value.numeropersonas+'</ser:numeroPersonas>'+
               '<ser:nombreProveedor>'+this.proveedor+'</ser:nombreProveedor>'+
               '<ser:tipoComida>'+ this.registerForm.value.tipocomida+'</ser:tipoComida>'+
               '<ser:cantidadPlatos>'+ this.registerForm.value.cantidadplatos+'</ser:cantidadPlatos>'+
            '</djan:servicio>'+
         '</djan:createServicioAlimentacion>'+
      '</soapenv:Body>'+
   '</soapenv:Envelope>';
    }else if(this.tipo === 'Transporte'){

      sr='';
    }else{

    }
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
              alert("Se creó el servicio correctamente");
            }
      }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
    this.router.navigate(['servicioss']);

  }

  cambiar(){
    console.log(this.tipo);
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsBinaryString(event.target.files[0]);

      this.ext=event.target.files[0].type;
      reader.onload = (event) => { // called once readAsDataURL is completed
            this.base64data=btoa(reader.result as string);
            console.log(this.base64data);
      }
    }
  }
}
