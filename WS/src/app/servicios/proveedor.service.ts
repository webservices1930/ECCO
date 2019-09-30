import { Injectable } from '@angular/core';
import { Proveedor } from '../model/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  ext: string;
  base64data: string;

  image: string;
  usuario: Proveedor = new Proveedor (
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
  );
  constructor() {
    this.base64data = " ";
    this.ext = " ";
   }

  registrarProveedor(registerForm, base64data, ext){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
    let sr=
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service" xmlns:ser="servicios.soapServices">'+
            '<soapenv:Header/>'+
            '<soapenv:Body>'+
              '<djan:createProveedor>'+
                '<djan:proveedor>'+
                    '<ser:nombreUsuario>'+registerForm.value.email+'</ser:nombreUsuario>'+
                    '<ser:nombre>'+registerForm.value.nombres+'</ser:nombre>'+
                  '<ser:edad>'+registerForm.value.edad+'</ser:edad>'+
                    '<ser:contrasena>'+registerForm.value.password+'</ser:contrasena>'+
                    '<ser:foto>'+base64data+'</ser:foto>'+
                    '<ser:tipo>'+ext+'</ser:tipo>'+
                    '<ser:descripcion>'+registerForm.value.descripcion+'</ser:descripcion>'+
                    '<ser:telefono>'+registerForm.value.telefono+'</ser:telefono>'+
                    '<ser:paginaWeb>'+registerForm.value.paginaweb+'</ser:paginaWeb>'+
                    '<ser:contactoRS>'+registerForm.value.contacto+'</ser:contactoRS>'+
                '</djan:proveedor>'+
              '</djan:createProveedor>'+
          '</soapenv:Body>'+
        '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
              alert("Se creó el proveedor correctamente");
            }
      }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
  }

}
