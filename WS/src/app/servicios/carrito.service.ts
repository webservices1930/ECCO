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
     console.log(cliente);
    var xmlhttp = new XMLHttpRequest();
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

  async getCarritoByUsernameJSON(userNameCliente: string){
    return new Promise(resolve => {
      setTimeout(() => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
        let sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
           '<djan:getCarrito>' +
              '<djan:nomUsuario>' + userNameCliente + '</djan:nomUsuario>'+
           '</djan:getCarrito>' +
        '</soapenv:Body>' +
     '</soapenv:Envelope>';
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var doc =  xmlToJson(xmlhttp.responseXML);
                console.log(doc);
                 let data=doc['soap11env:Envelope']['soap11env:Body']['tns:getCarritoResponse']['tns:getCarritoResult0'];
                console.log(data);
                let serviciosCopia=[];
                if(data['#text']==="true"){
                  data = doc['soap11env:Envelope']['soap11env:Body']['tns:getCarritoResponse']['tns:getCarritoResult1'];
                  let data1 = doc['soap11env:Envelope']['soap11env:Body']['tns:getCarritoResponse']['tns:getCarritoResult1']['s0:cliente'];
                  // tslint:disable-next-line: max-line-length
                  let data2 = doc['soap11env:Envelope']['soap11env:Body']['tns:getCarritoResponse']['tns:getCarritoResult1']['s0:servicios']['s0:ServicioRes'];
                  let carrito = new CarritoCompras ();
                  carrito.numServicios = +data['s0:numServicios']['#text'];
                  carrito.CostoTotal = data['s0:costoTotal']['#text'];
                  // ===================Para usuario===============================
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
                  usuario.nombre = data1['s0:nombre']['#text'];
                  usuario.descripcion = data1['s0:descripcion']['#text'];
                  usuario.edad = +data1['s0:edad']['#text'];
                  usuario.telefono = data1['s0:telefono']['#text'];
                  usuario.img = data1['s0:foto']['#text'];
                  //usuario.tipo = data1['s0:tipo']['#text'];
                  usuario.email = data1['s0:nombreUsuario']['#text'];
                  carrito.setCliente(usuario);
                  // ===================Para servicios===============================
                  data2.forEach(element => {
                    let servicio = new Servis (
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
                      undefined,
                      undefined,
                      undefined,
                      undefined
                    );
                    console.log(element['s0:nombre']['#text']);
                    servicio.nombre= element['s0:nombre']['#text'];
                    servicio.descripcion=element['s0:descripcion']['#text'];
                    servicio.costo=+element['s0:costo']['#text'];
                    let inf= element['s0:foto']['#text'];
                    servicio.img="data:image/"+element['s0:tipo']['#text']+";base64, "+inf;
                    servicio.idx=element['s0:id']['#text'];
                    servicio.pais=element['s0:pais']['#text'];
                    servicio.ciudad=element['s0:ciudad']['#text'];
                    servicio.idioma=element['s0:idioma']['#text'];
                    servicio.nombreproveedor=element['s0:nombreProveedor']['#text'];

                    //ESTÁ EN TODOS?? SI ESTA EN  TODOS.
                    servicio.numeroPersonas = element['s0:numeroPersonas']['#text'];
                    serviciosCopia.push(servicio);
                  });
                  carrito.setServicios(serviciosCopia);
                  resolve(carrito);
                } else {
                  console.log('noo');
                }
            }
        }
      }
      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.send(sr);
          }, 500);
    });
  }

  public removerDelCarrito(userNameCliente: string, servicio: Servis) {
   var xmlhttp = new XMLHttpRequest();
   xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
   let sr=
  '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
    '<soapenv:Header/>'+
    '<soapenv:Body>'+
      '<djan:removerDelCarrito>'+
         '<djan:nomUsuario>'+userNameCliente+'</djan:nomUsuario>'+
         '<djan:idServicio>'+servicio.idx+'</djan:idServicio>'+
      '</djan:removerDelCarrito>'+
   '</soapenv:Body>'+
  '</soapenv:Envelope>';
   xmlhttp.onreadystatechange = function () {
     if (xmlhttp.readyState == 4) {
         if (xmlhttp.status == 200) {
             alert('Se elimino el servicio del carrito');
           }
     }
   }
   // Send the POST request
   xmlhttp.setRequestHeader('Content-Type', 'text/xml');
   xmlhttp.send(sr);

 }
}
