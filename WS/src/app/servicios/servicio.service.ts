
import { Injectable } from '@angular/core';
import {xmlToJson} from './lib';
import { Servis } from '../model/servis';
import { ServicioAlimentacion } from '../model/servicioAlimentacion';
import { resolve } from 'url';

@Injectable()
export class ServicioService {
  serv: Servis = new Servis (
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  );
  serviciosCopia:any=[];
  servicios:any=[];

  serviciosAux:any=[];

  constructor() {
    this.getServicios().then(res => {
      this.serviciosCopia = res;
      this.servicios = res;
      console.log(this.servicios);
    });
  }

  getServicios(){
    return new Promise(resolve => {
      setTimeout(() => {
        this.getServiciosAlimentacionJSON().then(res => {
            this.serviciosAux = res;
            console.log(this.serviciosAux);
            resolve(this.serviciosAux);
         });
     }, 500);
    });
}

  crearServicio(registerForm,base64data,ext,tipo,user){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
    let sr='';
    if(tipo === 'Alimentacion'){
      console.log("si");
      sr='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service" xmlns:ser="servicios.soapServices">'+
      '<soapenv:Header/>'+
     '<soapenv:Body>'+
         '<djan:createServicioAlimentacion>'+
            '<!--Optional:-->'+
            '<djan:servicio>'+
               '<ser:nombre>'+registerForm.value.nombres+'</ser:nombre>'+
               '<ser:pais>'+registerForm.value.pais+'</ser:pais>'+
               '<ser:ciudad>'+registerForm.value.ciudad+'</ser:ciudad>'+
               '<ser:idioma>'+registerForm.value.idioma+'</ser:idioma>'+
               '<ser:costo>'+registerForm.value.costo+'</ser:costo>'+
               '<ser:descripcion>'+registerForm.value.descripcion+'</ser:descripcion>'+
               '<ser:foto>'+base64data+'</ser:foto>'+
               '<ser:tipo>'+ext+'</ser:tipo>'+
               '<ser:numeroPersonas>'+registerForm.value.numeropersonas+'</ser:numeroPersonas>'+
               '<ser:nombreProveedor>'+user+'</ser:nombreProveedor>'+
               '<ser:tipoComida>'+registerForm.value.tipocomida+'</ser:tipoComida>'+
               '<ser:cantidadPlatos>'+ registerForm.value.cantidadplatos+'</ser:cantidadPlatos>'+
            '</djan:servicio>'+
         '</djan:createServicioAlimentacion>'+
      '</soapenv:Body>'+
   '</soapenv:Envelope>';
    }else if(tipo === 'Transporte'){

    }else if(tipo === 'PaseoEcologico'){
      console.log(registerForm);
      sr =
              '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service" xmlns:ser="servicios.soapServices">'+
          '<soapenv:Header/>'+
          '<soapenv:Body>'+
              '<djan:createServicioPaseoEcologico>'+
                '<djan:servicio>'+
                    '<ser:nombre>'+registerForm.value.nombres+'</ser:nombre>'+
                    '<ser:pais>'+registerForm.value.pais+'</ser:pais>'+
                    '<ser:ciudad>'+registerForm.value.ciudad+'</ser:ciudad>'+
                    '<ser:idioma>'+registerForm.value.idioma+'</ser:idioma>'+
                    '<ser:costo>'+registerForm.value.costo+'</ser:costo>'+
                    '<ser:descripcion>'+registerForm.value.descripcion+'</ser:descripcion>'+
                    '<ser:foto>'+base64data+'</ser:foto>'+
                    '<ser:tipo>'+ext+'</ser:tipo>'+
                    '<ser:numeroPersonas>'+registerForm.value.numeropersonas+'</ser:numeroPersonas>'+
                    '<ser:nombreProveedor>'+user+'</ser:nombreProveedor>'+
                    '<ser:origen>'+registerForm.value.origen+'</ser:origen>'+
                    '<ser:destino>'+registerForm.value.destino+'</ser:destino>'+
                    '<ser:horaInicio>'+registerForm.value.horainicio+'</ser:horaInicio>'+
                    '<ser:horaFin>'+registerForm.value.horafin+'</ser:horaFin>'+
                '</djan:servicio>'+
              '</djan:createServicioPaseoEcologico>'+
          '</soapenv:Body>'+
        '</soapenv:Envelope>';
    }
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
              alert("Se creó el servicio correctamente");
            }
      }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
  }


  async getServiciosAlimentacionJSON(){
    return new Promise(resolve => {
      setTimeout(() => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
        let sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
                    '<soapenv:Header/>'+
                       '<soapenv:Body>'+
                    '<djan:getServiciosAlimentaicon/>'+
                  '</soapenv:Body>'+
               '</soapenv:Envelope>';
        var y = this;
        let data;
        xmlhttp.onreadystatechange =  function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var doc =  xmlToJson(xmlhttp.responseXML);
                console.log(doc);
                data=doc['soap11env:Envelope']['soap11env:Body']['tns:getServiciosAlimentaiconResponse']['tns:getServiciosAlimentaiconResult0'];
                console.log(data);
                let serviciosCopia=[];
                if(data['#text']==="true"){
                data = doc['soap11env:Envelope']['soap11env:Body']['tns:getServiciosAlimentaiconResponse']['tns:getServiciosAlimentaiconResult1']['s0:AlimentacionRes'];
                console.log(data);
                if(data.length === undefined ){
                      data = [];
                      data.push(doc['soap11env:Envelope']['soap11env:Body']['tns:getServiciosAlimentaiconResponse']['tns:getServiciosAlimentaiconResult1']['s0:AlimentacionRes']);
                }
                    data.forEach(element => {
                      let servicioAlimentacion = new ServicioAlimentacion (
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
                      servicioAlimentacion.nombre= element['s0:nombre']['#text'];
                      servicioAlimentacion.descripcion=element['s0:descripcion']['#text'];
                      servicioAlimentacion.costo=+element['s0:costo']['#text'];
                      let inf= element['s0:foto']['#text'];
                      servicioAlimentacion.img="data:image/"+element['s0:tipo']['#text']+";base64, "+inf.slice(2,inf.length-1);
                      servicioAlimentacion.idx=element['s0:id']['#text'];
                      servicioAlimentacion.pais=element['s0:pais']['#text'];
                      servicioAlimentacion.ciudad=element['s0:ciudad']['#text'];
                      servicioAlimentacion.tipo="Alimentacion";
                      servicioAlimentacion.cantidadplatos=['s0:cantidadPlatos']['#text'];
                      servicioAlimentacion.numeropersonas=['s0:numeroPersonas']['#text'];
                      servicioAlimentacion.nombreproveedor=['s0:nombreProveedor']['#text'];
                      servicioAlimentacion.tipocomida=['s0:tipoComida']['#text'];
                      serviciosCopia.push(servicioAlimentacion);
                      resolve(serviciosCopia);
                });
              }
            }
      }
    }
      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.send(sr);
          }, 1500);
        });

  }

  getServicioAlimentacionById(id){
    return new Promise(resolve => {
      setTimeout(() => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
        let sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
        '<soapenv:Header/>'+
        '<soapenv:Body>'+
          '<djan:readServicioAlimentacion>'+
              '<djan:serviceId>'+id+'</djan:serviceId>'+
           '</djan:readServicioAlimentacion>'+
        '</soapenv:Body>'+
      '</soapenv:Envelope>';
        var y = this;
        xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == 4) {
              if (xmlhttp.status == 200) {
                  var doc =  xmlToJson(xmlhttp.responseXML);
                  console.log(doc);
                  let data=doc['soap11env:Envelope']['soap11env:Body']['tns:readServicioAlimentacionResponse']['tns:readServicioAlimentacionResult1'];
                  console.log(data);
                  let servicioAlimentacion = new ServicioAlimentacion (
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
                  servicioAlimentacion.nombre= data['s0:nombre']['#text'];
                  servicioAlimentacion.descripcion=data['s0:descripcion']['#text'];
                  servicioAlimentacion.costo=+data['s0:costo']['#text'];
                  let inf= data['s0:foto']['#text'];
                  servicioAlimentacion.img="data:image/"+data['s0:tipo']['#text']+";base64, "+inf.slice(2,inf.length-1);
                  servicioAlimentacion.idx=data['s0:id']['#text'];
                  servicioAlimentacion.pais=data['s0:pais']['#text'];
                  servicioAlimentacion.ciudad=data['s0:ciudad']['#text'];
                  servicioAlimentacion.tipo="Alimentacion";
                  resolve(servicioAlimentacion);
              }
          }
        }
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.send(sr);
            }, 500);
      });
}

async getServiciosPaseoEcologicoJSON(){
  return new Promise(resolve => {
    setTimeout(() => {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
      let sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
                  '<soapenv:Header/>'+
                     '<soapenv:Body>'+
                  '<djan:getServiciosAlimentaicon/>'+
                '</soapenv:Body>'+
             '</soapenv:Envelope>';
      var y = this;
      let data;
      xmlhttp.onreadystatechange =  function () {
      if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
              var doc =  xmlToJson(xmlhttp.responseXML);
              console.log(doc);
              data=doc['soap11env:Envelope']['soap11env:Body']['tns:getServiciosAlimentaiconResponse']['tns:getServiciosAlimentaiconResult0'];
              console.log(data);
              let serviciosCopia=[];
              if(data['#text']==="true"){
              data = doc['soap11env:Envelope']['soap11env:Body']['tns:getServiciosAlimentaiconResponse']['tns:getServiciosAlimentaiconResult1']['s0:AlimentacionRes'];
              console.log(data);
              if(data.length === undefined ){
                    data = [];
                    data.push(doc['soap11env:Envelope']['soap11env:Body']['tns:getServiciosAlimentaiconResponse']['tns:getServiciosAlimentaiconResult1']['s0:AlimentacionRes']);
              }
                  data.forEach(element => {
                    let servicioAlimentacion = new ServicioAlimentacion (
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
                    servicioAlimentacion.nombre= element['s0:nombre']['#text'];
                    servicioAlimentacion.descripcion=element['s0:descripcion']['#text'];
                    servicioAlimentacion.costo=+element['s0:costo']['#text'];
                    let inf= element['s0:foto']['#text'];
                    servicioAlimentacion.img="data:image/"+element['s0:tipo']['#text']+";base64, "+inf.slice(2,inf.length-1);
                    servicioAlimentacion.idx=element['s0:id']['#text'];
                    servicioAlimentacion.pais=element['s0:pais']['#text'];
                    servicioAlimentacion.ciudad=element['s0:ciudad']['#text'];
                    servicioAlimentacion.tipo="Alimentacion";
                    servicioAlimentacion.cantidadplatos=['s0:cantidadPlatos']['#text'];
                    servicioAlimentacion.numeropersonas=['s0:numeroPersonas']['#text'];
                    servicioAlimentacion.nombreproveedor=['s0:nombreProveedor']['#text'];
                    servicioAlimentacion.tipocomida=['s0:tipoComida']['#text'];
                    serviciosCopia.push(servicioAlimentacion);
                    resolve(serviciosCopia);
              });
            }
          }
    }
  }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
        }, 1500);
      });

}




  getServicioById(id){

  }

  getServicio( idx: string ){
    return this.servicios[idx];
  }

  buscarServicios( termino:string ):Servis[]{

    let serviciosArr:Servis[] = [];
    termino = termino.toLowerCase();

    for( let i = 0; i < this.servicios.length; i ++ ){

      let servicio = this.servicios[i];

      let nombre = servicio.nombre.toLowerCase();

      if( nombre.indexOf( termino ) >= 0  ){
        servicio.idx = i;
        serviciosArr.push( servicio )
      }

    }

    return serviciosArr;

  }


}
