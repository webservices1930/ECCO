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
              console.log(element['s0:nombre']['#text']);
              this.usuario.nombre = element['s0:nombre']['#text'];
              this.usuario.descripcion = element['s0:descripcion']['#text'];
              this.usuario.edad = +element['s0:edad']['#text'];
              this.usuario.telefono = element['s0:telefono']['#text'];
              this.usuario.img = element['s0:foto']['#text'];
              this.usuario.tipo = element['s0:tipo']['#text'];
              this.usuario.email = element['s0:nombreUsuario']['#text'];
              this.usuariosCopia.push(this.usuario);
              console.log(this.usuariosCopia);
              console.log(user);
            });
              this.usuariosCopia.forEach(element => {
                  if(element.email === user){
                      resolve(element);
                  }
              });
          });
        });
      }
}
