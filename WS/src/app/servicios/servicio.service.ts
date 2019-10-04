
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
    this.getTodosServicios().then(res => {
      this.serviciosCopia = res;
      this.servicios = res;
      console.log(this.servicios);
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

  

//Busca en TODOS los servicios
getServicioId(id){
  return new Promise(resolve => {
    setTimeout(() => {
      var xmlhttp = new XMLHttpRequest();
      console.log('hola');
      xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
      let sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
                  '<soapenv:Header/>'+
                  '<soapenv:Body>'+
                  '<djan:readServicio>'+
                     '<djan:serviceId>'+id+'</djan:serviceId>'+
                  '</djan:readServicio>'+
               '</soapenv:Body>'+
             '</soapenv:Envelope>';
      var y = this;
      let data;
      console.log('dd');
      xmlhttp.onreadystatechange =  function () {
        console.log('xd');
      if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
              var doc =  xmlToJson(xmlhttp.responseXML);
              console.log(doc);
              data=doc['soap11env:Envelope']['soap11env:Body']['tns:readServicioResponse']['tns:readServicioResult0'];
              console.log(data);
              let serviciosCopia=[];
              if(data['s0:resultado']['#text']==="encontrado"){
              data = doc['soap11env:Envelope']['soap11env:Body']['tns:readServicioResponse']['tns:readServicioResult1'];
              console.log(data);
              if(data.length === undefined ){
                    data = [];
                    data.push(doc['soap11env:Envelope']['soap11env:Body']['tns:readServicioResponse']['tns:readServicioResult1']);
              }
                  data.forEach(element => {
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
                    servicio.tipo=element['s0:tipoServicio']['#text'];
                    servicio.nombreproveedor=element['s0:nombreProveedor']['#text'];
                    serviciosCopia.push(servicio);
                    resolve(serviciosCopia);
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

 getTodosServicios(){
  return new Promise(resolve => {
    setTimeout(() => {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
      let sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
                  '<soapenv:Header/>'+
                     '<soapenv:Body>'+
                  '<djan:getServicios/>'+
                '</soapenv:Body>'+
             '</soapenv:Envelope>';
      var y = this;
      let data;
      xmlhttp.onreadystatechange =  function () {
      if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
              var doc =  xmlToJson(xmlhttp.responseXML);
              console.log(doc);
              data=doc['soap11env:Envelope']['soap11env:Body']['tns:getServiciosResponse']['tns:getServiciosResult0'];
              console.log(data);
              let serviciosCopia=[];
              if(data['#text']==="true"){
              data = doc['soap11env:Envelope']['soap11env:Body']['tns:getServiciosResponse']['tns:getServiciosResult1']['s0:ServicioRes'];
              console.log(data);
              if(data.length === undefined ){
                    data = [];
                    data.push(doc['soap11env:Envelope']['soap11env:Body']['tns:getServiciosResponse']['tns:getServiciosResult1']['s0:ServicioRes']);
              }
                  data.forEach(element => {
                    let servicio = new Servis (
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
                    servicio.tipo=element['s0:tipoServicio']['#text'];
                    servicio.nombreproveedor=element['s0:nombreProveedor']['#text'];
                    serviciosCopia.push(servicio);
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

  eliminarServicio(id){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
    let sr=
          '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
          '<soapenv:Header/>'+
          '<soapenv:Body>'+
              '<djan:deleteServicio>'+
                '<djan:id_servicio>'+id+'</djan:id_servicio>'+
              '</djan:deleteServicio>'+
          '</soapenv:Body>'+
        '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == 4) {
              if (xmlhttp.status == 200) {
                  alert("Se borró el servicio correctamente");
                }
          }
        }
        // Send the POST request
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.send(sr);

  }

  getServicio( idx: string ){
    return this.servicios[idx];
  }

  buscarServicios( termino:string ):Servis[]{

    let serviciosArr:Servis[] = [];
    termino = termino.toLowerCase();
    this.servicios.forEach(element => {
        let servicio = element;
        let nombre = servicio.nombre.toLowerCase();
        if( nombre.indexOf( termino ) >= 0  ){
          serviciosArr.push( servicio );
        }
    });
    return serviciosArr;

  }


}
