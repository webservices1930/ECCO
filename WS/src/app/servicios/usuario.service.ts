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
          this.getUsuariosJSON().then(res => {
            this.usuarios = res;
            console.log(this.usuarios);
            if(this.usuarios.length === undefined){
                this.usuarios = [];
                this.usuarios.push(res);
            }
              this.usuarios.forEach(element => {
                this.usuario = new Usuario (
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                );
                this.usuario.nombre = element['s0:nombre']['#text'];
                this.usuario.descripcion = element['s0:descripcion']['#text'];
                this.usuario.edad = +element['s0:edad']['#text'];
                this.usuario.telefono = element['s0:telefono']['#text'];
                this.usuario.img = element['s0:foto']['#text'];
                this.usuario.tipo = element['s0:tipo']['#text'];
                this.usuario.email = element['s0:nombreUsuario']['#text'];
                this.usuariosCopia.push(this.usuario);
              });
              this.usuariosCopia.forEach(element => {
                  if(element.email === user){
                      resolve(element);
                  }
              });
          });
        });
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
