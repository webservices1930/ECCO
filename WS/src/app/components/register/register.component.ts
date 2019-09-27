import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  url = '';
  id = '';


  base64data: string;
  ext : string;
  image :string;


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
        email: ['', Validators.required],
        password: ['', [Validators.required]],
        edad:['', Validators.required],
        telefono:['', Validators.required],
        descripcion:['', Validators.required],
        tipo:['', Validators.required],
        paginaweb:['', ],
        contacto:['', ]
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
    if(this.tipo === 'Proveedor'){
      console.log("si");
      sr=
     '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service" xmlns:ser="servicios.soapServices">'+
   '<soapenv:Header/>'+
   '<soapenv:Body>'+
      '<djan:createProveedor>'+
         '<djan:proveedor>'+
            '<ser:nombreUsuario>'+this.registerForm.value.email+'</ser:nombreUsuario>'+
            '<ser:nombre>'+this.registerForm.value.nombres+'</ser:nombre>'+
           '<ser:edad>'+this.registerForm.value.edad+'</ser:edad>'+
            '<ser:contrasena>'+this.registerForm.value.password+'</ser:contrasena>'+
            '<ser:foto>'+this.base64data+'</ser:foto>'+
            '<ser:tipo>'+this.ext+'</ser:tipo>'+
            '<ser:descripcion>'+this.registerForm.value.descripcion+'</ser:descripcion>'+
            '<ser:telefono>'+this.registerForm.value.telefono+'</ser:telefono>'+
            '<ser:paginaWeb>'+this.registerForm.value.paginaweb+'</ser:paginaWeb>'+
            '<ser:contactoRS>'+this.registerForm.value.contacto+'</ser:contactoRS>'+
         '</djan:proveedor>'+
      '</djan:createProveedor>'+
   '</soapenv:Body>'+
'</soapenv:Envelope>';
    }else{

      sr=
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service" xmlns:ser="servicios.soapServices">'+
      '<soapenv:Header/>'+
      '<soapenv:Body>'+
        '<djan:createUsuario>'+
            '<djan:cliente>'+
               '<ser:nombreUsuario>'+this.registerForm.value.email+'</ser:nombreUsuario>'+
              '<ser:nombre>'+this.registerForm.value.nombres+'</ser:nombre>'+
               '<ser:edad>'+this.registerForm.value.edad+'</ser:edad>'+
               '<ser:contrasena>'+this.registerForm.value.password+'</ser:contrasena>'+
               '<ser:foto>'+this.base64data+'</ser:foto>'+
               '<ser:tipo>'+this.ext+'</ser:tipo>'+
               '<ser:descripcion>'+this.registerForm.value.descripcion+'</ser:descripcion>'+
               '<ser:telefono>'+this.registerForm.value.telefono+'</ser:telefono>'+
            '</djan:cliente>'+
         '</djan:createUsuario>'+
      '</soapenv:Body>'+
   '</soapenv:Envelope>';
    }
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
              alert("Se creó el usuario correctamente");
            }
      }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);

    this.router.navigate(['login']);

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
