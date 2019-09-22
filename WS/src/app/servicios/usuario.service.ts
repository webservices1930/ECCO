import { Injectable } from '@angular/core';
import {xmlToJson} from './lib';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  async getUsuariosJSON(){
    return new Promise(resolve => {
      setTimeout(() => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
        let sr= '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
        '<soapenv:Header/>'+
        '<soapenv:Body>'+
        '<djan:getAllUsuarios/>'+
        '</soapenv:Body>'+
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
            }, 1000);
          });
      }
}
