import { Injectable } from '@angular/core';
import {xmlToJson} from './lib';
import { CarritoCompras } from '../model/carrito-compras';
import { Usuario } from '../model/usuario';
import { Servis } from '../model/servis';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  carrito: CarritoCompras;
  ext: string;
  base64data: string;
  image: string;
  constructor(private http: HttpClient) {
    this.base64data = " ";
    this.ext = " ";
   }

   public agregarAlCarrito(id, servicio) { //cliente.Id + servicio.Id
    const url = `${environment.baseUrl}/usuario/carrito/${id}/${servicio.id}`;
    console.log("Entraaa ctm");
    console.log(url);
    return this.http.put<any>(url, {});
  }

  /*async getCarritoCostoByUsernameJSON(userNameCliente: string){
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
                let costoTotal="0";
                if(data['#text']==="true"){
                  data = doc['soap11env:Envelope']['soap11env:Body']['tns:getCarritoResponse']['tns:getCarritoResult1'];
                  costoTotal = data['s0:costoTotal']['#text'];
                  resolve(costoTotal);
                } else {
                  resolve(costoTotal);
                  console.log('noo');
                }
            }
        }
      }
      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.send(sr);
          }, 500);
    });
  }*/

  public getCarritoServicios(idCliente){
    const url = `${environment.baseUrl}/usuario/carrito/${idCliente}`;
    return this.http.get<CarritoCompras>(url);
  }

  public removerDelCarrito(id, servicio) {
    const url = `${environment.baseUrl}/usuario/carrito/${id}/${servicio.id}`;
    return this.http.delete<any>(url);
  }
}
