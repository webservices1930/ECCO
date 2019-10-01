import { Injectable } from '@angular/core';
import { Proveedor } from '../model/proveedor';
import {xmlToJson} from './lib';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  ext: string;
  base64data: string;

  image: string;
  proveedor: Proveedor = new Proveedor (
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

   proveedores;
   proveedoresCopia: Proveedor[] = [];
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


  async getProveedoresJSON(){
    return new Promise(resolve => {
      setTimeout(() => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
        let sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
                  '<soapenv:Header/>'+
                  '<soapenv:Body>'+
                    '<djan:getAllProveedores/>'+
                  '</soapenv:Body>'+
              '</soapenv:Envelope>';
        var y = this;
        xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
              if (xmlhttp.status == 200) {
                      var doc =  xmlToJson(xmlhttp.responseXML);
                      let data=doc['soap11env:Envelope']['soap11env:Body']['tns:getAllProveedoresResponse']['tns:getAllProveedoresResult']['s0:ProveedorRes'];
                      console.log(data);
                      resolve(data);
                  }
              }
            }
              // Send the POST request
              xmlhttp.setRequestHeader('Content-Type', 'text/xml');
              xmlhttp.send(sr);
                  }, 500);
                });
            }

    async getProveedorByUsernameJSON(user){
        return new Promise(resolve => {
           this.getProveedoresJSON().then(res => {
           this.proveedores = res;
           console.log(this.proveedores);
           if(this.proveedores.length === undefined){
            this.proveedores = [];
            this.proveedores.push(res);
        }
           this.proveedores.forEach(element => {
           this.proveedor = new Proveedor (
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
              this.proveedor.nombre = element['s0:nombre']['#text'];
              this.proveedor.descripcion = element['s0:descripcion']['#text'];
              this.proveedor.edad = +element['s0:edad']['#text'];
              this.proveedor.telefono = element['s0:telefono']['#text'];
              this.proveedor.img = element['s0:foto']['#text'];
              this.proveedor.tipo = element['s0:tipo']['#text'];
              this.proveedor.email = element['s0:nombreUsuario']['#text'];
              this.proveedoresCopia.push(this.proveedor);
           });
           this.proveedoresCopia.forEach(element => {
            if(element.email === user){
                resolve(element);
            }
        });
          });
        });
      }


}
