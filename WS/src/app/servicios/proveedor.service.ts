import { Injectable } from '@angular/core';
import { Proveedor } from '../model/proveedor';
import {xmlToJson} from './lib';
import { resolve } from 'url';

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


borrarProveedor(usuarioProveedor){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
  let sr=
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
        '<soapenv:Header/>'+
        '<soapenv:Body>'+
            '<djan:deleteProveedor>'+
              '<djan:nombreUsuario>'+usuarioProveedor+'</djan:nombreUsuario>'+
            '</djan:deleteProveedor>'+
        '</soapenv:Body>'+
      '</soapenv:Envelope>';
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                alert("Se borró el proveedor correctamente");
              }
        }
      }
      // Send the POST request
      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.send(sr);
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

            updateProveedor(proveedorMostrar,base64data, ext){
              console.log(proveedorMostrar);
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
                let sr= '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service" xmlns:ser="servicios.soapServices">'+
                '<soapenv:Header/>'+
                 '<soapenv:Body>'+
                   '<djan:updateProveedor>'+
                   '<djan:nomUsuProv>'+proveedorMostrar.email+'</djan:nomUsuProv>'+
                       '<djan:proveedor>'+
                         '<ser:nombreUsuario>'+proveedorMostrar.email+'</ser:nombreUsuario>'+
                         '<ser:nombre>'+proveedorMostrar.nombre+'</ser:nombre>'+
                         '<ser:edad>'+proveedorMostrar.edad+'</ser:edad>'+
                         '<ser:contrasena>'+proveedorMostrar.password+'</ser:contrasena>'+
                         '<ser:foto>'+base64data+'</ser:foto>'+
                         '<ser:tipo>'+ext+'</ser:tipo>'+
                         '<ser:descripcion>'+proveedorMostrar.descripcion+'</ser:descripcion>'+
                         '<ser:telefono>'+proveedorMostrar.telefono+'</ser:telefono>'+
                         '<ser:paginaWeb>'+proveedorMostrar.paginaweb +'</ser:paginaWeb>'+
                         '<ser:contactoRS>'+ proveedorMostrar.contacto+'</ser:contactoRS>'+
                       '</djan:proveedor>'+
                   '</djan:updateProveedor>'+
                 '</soapenv:Body>'+
             '</soapenv:Envelope>';
        
                xmlhttp.onreadystatechange = function () {
                  if (xmlhttp.readyState == 4) {
                      if (xmlhttp.status == 200) {
                          alert("Se actualizó el proveedor correctamente");
                        }
                  }
                }
                // Send the POST request
                xmlhttp.setRequestHeader('Content-Type', 'text/xml');
                xmlhttp.send(sr);
             
          }


    async getProveedorByUsernameJSON(user){
      console.log('hola');
      return new Promise(resolve => {
        setTimeout(() => {
          var xmlhttp = new XMLHttpRequest();
          xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
          let sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
          '<soapenv:Header/>'+
          '<soapenv:Body>'+
             '<djan:readProveedor>'+
                '<!--Optional:-->'+
                '<djan:provName>'+user+'</djan:provName>'+
             '</djan:readProveedor>'+
          '</soapenv:Body>'+
       '</soapenv:Envelope>';
        var y = this;
        xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == 4) {
              if (xmlhttp.status == 200) {
                  var doc =  xmlToJson(xmlhttp.responseXML);
                  console.log(doc);
                  let data=doc['soap11env:Envelope']['soap11env:Body']['tns:readProveedorResponse']['tns:readProveedorResult1'];
                  console.log(data);
                  let proveedor = new Proveedor (
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
                    proveedor.nombre = data['s0:nombre']['#text'];
                    proveedor.descripcion = data['s0:descripcion']['#text'];
                    proveedor.edad = +data['s0:edad']['#text'];
                    proveedor.telefono = data['s0:telefono']['#text'];
                    proveedor.img = data['s0:foto']['#text'];
                    proveedor.tipo = data['s0:tipo']['#text'];
                    proveedor.email = data['s0:nombreUsuario']['#text'];
                    proveedor.contacto = data['s0:contactoRS']['#text'];
                    proveedor.paginaweb = data['s0:paginaWeb']['#text'];

                    resolve(proveedor);
              }
          }
        }
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.send(sr);
            }, 500);
     });
  }
}
