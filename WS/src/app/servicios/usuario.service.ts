import { Injectable } from '@angular/core';
import {xmlToJson} from './lib';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarios;
  usuariosCopia: Usuario[] = [];
  ext: string;
  base64data: string;

  image: string;
  usuario: Usuario = new Usuario (
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

  async getUsuariosJSON(){
    return new Promise(resolve => {
      setTimeout(() => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
        let sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<djan:getAllUsuarios/>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

        var y = this;
        xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == 4) {
              if (xmlhttp.status == 200) {
                  var doc =  xmlToJson(xmlhttp.responseXML);
                  console.log(doc);
                  let data=doc['soap11env:Envelope']['soap11env:Body']['tns:getAllUsuariosResponse']['tns:getAllUsuariosResult']['s0:ClientRes'];
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

      async getUsuarioByUsernameJSON(user){
        return new Promise(resolve => {
          setTimeout(() => {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
            let sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
            '<soapenv:Header/>'+
            '<soapenv:Body>'+
               '<djan:readUsuario>'+
                  '<!--Optional:-->'+
                  '<djan:userName>'+user+'</djan:userName>'+
               '</djan:readUsuario>'+
            '</soapenv:Body>'+
         '</soapenv:Envelope>';
          var y = this;
          xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var doc =  xmlToJson(xmlhttp.responseXML);
                    console.log(doc);
                    let data=doc['soap11env:Envelope']['soap11env:Body']['tns:readUsuarioResponse']['tns:readUsuarioResult1'];
                    console.log(data);
                    let usuario = new Usuario (
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                    );
                    usuario.nombre = data['s0:nombre']['#text'];
                    usuario.descripcion = data['s0:descripcion']['#text'];
                    usuario.edad = +data['s0:edad']['#text'];
                    usuario.telefono = data['s0:telefono']['#text'];
                    usuario.img = data['s0:foto']['#text'];
                    usuario.tipo = data['s0:tipo']['#text'];
                    usuario.email = data['s0:nombreUsuario']['#text'];
                    resolve(usuario);
                }
            }
          }
          xmlhttp.setRequestHeader('Content-Type', 'text/xml');
          xmlhttp.send(sr);
              }, 500);
    });
  }


borrarUsuario(usuario){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
  let sr=
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
        '<soapenv:Header/>'+
        '<soapenv:Body>'+
            '<djan:deleteUsuario>'+
              '<djan:nombreUsuario>'+usuario+'</djan:nombreUsuario>'+
            '</djan:deleteUsuario>'+
        '</soapenv:Body>'+
      '</soapenv:Envelope>';
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                alert("Se borró el usuario correctamente");
              }
        }
      }
      // Send the POST request
      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.send(sr);
}

      registrarUsuario(registerForm, base64data, ext){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
        let sr=
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service" xmlns:ser="servicios.soapServices">'+
        '<soapenv:Header/>'+
         '<soapenv:Body>'+
           '<djan:createUsuario>'+
               '<djan:cliente>'+
                 '<ser:nombreUsuario>'+registerForm.value.email+'</ser:nombreUsuario>'+
                 '<ser:nombre>'+registerForm.value.nombres+'</ser:nombre>'+
                 '<ser:edad>'+registerForm.value.edad+'</ser:edad>'+
                 '<ser:contrasena>'+registerForm.value.password+'</ser:contrasena>'+
                 '<ser:foto>'+base64data+'</ser:foto>'+
                 '<ser:tipo>'+ext+'</ser:tipo>'+
                 '<ser:descripcion>'+registerForm.value.descripcion+'</ser:descripcion>'+
                 '<ser:telefono>'+registerForm.value.telefono+'</ser:telefono>'+
               '</djan:cliente>'+
           '</djan:createUsuario>'+
         '</soapenv:Body>'+
     '</soapenv:Envelope>';

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

      }
}
