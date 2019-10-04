import { Injectable } from '@angular/core';
import {xmlToJson} from './lib';
import { CarritoCompras } from '../model/carrito-compras';
import { Usuario } from '../model/usuario';
import { Servis } from '../model/servis';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  carrito: CarritoCompras;
  ext: string;
  base64data: string;
  image: string;
  constructor() {
    this.base64data = " ";
    this.ext = " ";
   }

   public agregarAlCarrito(cliente: Usuario, servicio: Servis) {
    var xmlhttp = new XMLHttpRequest();
    //console.log(carrito.servicios[carrito.servicios.length - 1].idx );
    xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
    let sr=
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
      '<soapenv:Header/>'+
        '<soapenv:Body>'+
          '<djan:agregarAlCarrito>'+
            '<djan:nomUsuario>' + cliente.email + '</djan:nomUsuario>'+
            '<djan:idServicio>' + servicio.idx + '</djan:idServicio>'+
          '</djan:agregarAlCarrito>'+
        '</soapenv:Body>'+
    '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
              alert('Se agrego el servicio al carrito');
            }
      }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);

  }

  /*async getCarritoByUsernameJSON(user){
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
  }*/
}
