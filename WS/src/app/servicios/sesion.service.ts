import { Injectable } from '@angular/core';
import { Servis } from '../model/servis';
import {xmlToJson} from './lib';
import { Subject } from 'rxjs';

@Injectable()
export class SesionService {
    private servicios:Servis[] =[];
    private total:number[] = [];
    id="";
    sesion ="";
    sesionCambio: Subject<string> = new Subject<string>();
    idCambio: Subject<string> = new Subject<string>();
    constructor(){
        this.sesion = "sininiciar";
        this.sesionCambio.next(this.sesion);

        this.id = "";
        this.idCambio.next(this.id);
    }


    agregarServicio(servicio:Servis){
        this.servicios.push(servicio);
        if(this.total.length===0){
            this.total[0]=servicio.costo;
        }else{
            this.total[0]+=servicio.costo;
        }

        console.log(this.servicios);
        console.log(this.total);
    }
    getServicios():Servis[]{
        return this.servicios;
    }
    getTotal(){
        return this.total;
    }
    quitarServicio(servicio:Servis){
        for(var i=0;i<this.servicios.length;i++) {
            if(this.servicios[i].nombre === servicio.nombre){
                this.servicios.splice(i, 1);
                this.total[0]-=servicio.costo;
            }
        }
    }
    getSesion(){
      return this.sesion;
    }

    setSesion(x){
      this.sesion = x;
    }

    setServicios(servicios){
      this.servicios = servicios;
    }

    reiniciarCarrito(){
      this.servicios = [];
      this.total = [];
      this.total[0] = 0;
    }

    async login(usuario,contrasena){
      console.log(usuario + contrasena);
        return new Promise(resolve => {
          setTimeout(() => {
            var xmlhttp = new XMLHttpRequest();
            console.log(usuario + contrasena);
            xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
            let sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service" xmlns:ser="servicios.soapServices">' +
                      '<soapenv:Header/>' +
                      '<soapenv:Body>' +
                      '<djan:LogIn>' +
                      '<djan:request>' +
                      '<ser:nombreUsuario>' + usuario + '</ser:nombreUsuario>' +
                        '<ser:contrasena>' + contrasena + '</ser:contrasena>' +
                        '</djan:request>' +
                        '</djan:LogIn>' +
                      '</soapenv:Body>' +
                    '</soapenv:Envelope>';
              var y = this;
              let data;
              xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var doc =  xmlToJson(xmlhttp.responseXML);
                        console.log(doc);
                        data=doc['soap11env:Envelope']['soap11env:Body']['tns:LogInResponse']['tns:LogInResult1'];
                        console.log(data);
                        if(data['s0:tipoUsuaro'] !== undefined){
                          resolve(data['s0:tipoUsuaro']['#text']);
                        }else{
                          resolve('');
                        }
                    }
                }
              }
               xmlhttp.setRequestHeader('Content-Type', 'text/xml');
               xmlhttp.send(sr);
          },100);
      });
    }
}
