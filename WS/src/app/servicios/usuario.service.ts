import { Injectable } from '@angular/core';
import {xmlToJson} from './lib';
import { Usuario } from '../model/usuario';
import { CompileShallowModuleMetadata } from '@angular/compiler';

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

getUsuarioByUsernameJSON(usuario){
  return new Promise(resolve => {
    setTimeout(() => {
      var xmlhttp = new XMLHttpRequest();
      console.log('hola');
      xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
      let sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
                '<soapenv:Header/>'+
                '<soapenv:Body>'+
                '<djan:readUsuario>'+
                  '<djan:userName>'+usuario+'</djan:userName>'+
                '</djan:readUsuario>'+
            '</soapenv:Body>'+
          '</soapenv:Envelope>';
          var y = this;
          let data;
          xmlhttp.onreadystatechange =  function () {
          if (xmlhttp.readyState == 4) {
              if (xmlhttp.status == 200) {
                  var doc =  xmlToJson(xmlhttp.responseXML);
                  console.log(doc);
                  data=doc['soap11env:Envelope']['soap11env:Body']['tns:readUsuarioResponse']['tns:readUsuarioResult0'];
                  console.log(data);
                  if(data['s0:resultado']['#text']==="usuario leido con exito"){
                    data=doc['soap11env:Envelope']['soap11env:Body']['tns:readUsuarioResponse']['tns:readUsuarioResult1'];
                    console.log(data);
                  if(data.length === undefined ){
                        data = [];
                        data.push(doc['soap11env:Envelope']['soap11env:Body']['tns:readUsuarioResponse']['tns:readUsuarioResult1']);
                  }
                  data.forEach(element => {
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
                    console.log(element['s0:nombre']['#text']);
                    usuario.nombre= element['s0:nombre']['#text'];
                    usuario.descripcion=element['s0:descripcion']['#text'];
                    usuario.edad=+element['s0:edad']['#text'];
                    usuario.img=element['s0:foto']['#text'];
                    usuario.telefono=+element['s0:telefono']['#text'];
                    usuario.email=element['s0:nombreUsuario']['#text'];
                    usuario.tipo = element['s0:tipo']['#text'];
                    resolve(usuario);
                  });
                }else{
                  console.log('noo');
                }
              }
        }
      }
      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.send(sr);
          }, 1500);
        });
}

updateUsuario(usuarioMostrar,base64data, ext){
        console.log(usuarioMostrar);
        console.log(base64data);
        console.log(ext);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
        let sr= '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service" xmlns:ser="servicios.soapServices">'+
        '<soapenv:Header/>'+
         '<soapenv:Body>'+
           '<djan:updateUsuario>'+
           '<djan:nomUsuCli>'+usuarioMostrar.email+'</djan:nomUsuCli>'+
               '<djan:cliente>'+
                 '<ser:nombreUsuario>'+usuarioMostrar.email+'</ser:nombreUsuario>'+
                 '<ser:nombre>'+usuarioMostrar.nombre+'</ser:nombre>'+
                 '<ser:edad>'+usuarioMostrar.edad+'</ser:edad>'+
                 '<ser:contrasena>'+usuarioMostrar.password+'</ser:contrasena>'+
                 '<ser:foto>'+base64data+'</ser:foto>'+
                 '<ser:tipo>'+ext+'</ser:tipo>'+
                 '<ser:descripcion>'+usuarioMostrar.descripcion+'</ser:descripcion>'+
                 '<ser:telefono>'+usuarioMostrar.telefono+'</ser:telefono>'+
               '</djan:cliente>'+
           '</djan:updateUsuario>'+
         '</soapenv:Body>'+
     '</soapenv:Envelope>';

        xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == 4) {
              if (xmlhttp.status == 200) {
                  alert("Se actualizó el usuario correctamente");
                }
          }
        }
        // Send the POST request
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.send(sr);

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
