import { Injectable } from '@angular/core';
import { Pregunta } from '../model/pregunta';
import { xmlToJson } from './lib';
import { Usuario } from '../model/usuario';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor() { }


  async getPreguntasServicio(idServicio: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
        let sr =
          '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">' +
            '<soapenv:Header/>' +
              '<soapenv:Body>' +
                '<djan:getPreguntasServicio>' +
                  '<djan:idServicio>' + idServicio + '</djan:idServicio>' +
                '</djan:getPreguntasServicio>' +
              '</soapenv:Body>' +
          '</soapenv:Envelope>';

        let data;
        xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
              //falta pasarlas a las preguntas

              var doc = xmlToJson(xmlhttp.responseXML);
              data = doc['soap11env:Envelope']['soap11env:Body']['tns:getPreguntasServicioResponse']['tns:getPreguntasServicioResult0'];
              let preguntas = [];
              resolve(preguntas);
              if (data['#text'] === "true") {
                data = doc['soap11env:Envelope']['soap11env:Body']['tns:getPreguntasServicioResponse']['tns:getPreguntasServicioResult1']['s0:PreguntaRes'];
                if (data.length === undefined) {
                  data = [];
                  data.push(doc['soap11env:Envelope']['soap11env:Body']['tns:getPreguntasServicioResponse']['tns:getPreguntasServicioResult1']['s0:PreguntaRes']);
                }
                data.forEach(element => {
                  let pregunta = new Pregunta(
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined
                  );
                  pregunta.pregunta = element['s0:pregunta']['#text'];
                  pregunta.fechaPregunta = element['s0:fechaPregunta']['#text'];

                  pregunta.id = element['s0:id']['#text'];

                  pregunta.respuesta = element['s0:repuesta']['#text'];
                  pregunta.fechaRespuesta = element['s0:fechaRespuesta']['#text'];

                  pregunta.responder = false;

                  let cliente = new Usuario(
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined
                  )

                  cliente.nombre = element['s0:cliente']['s0:nombre']['#text'];
                  let inf = element['s0:cliente']['s0:foto']['#text'];
                  cliente.img = "data:image/" + element['s0:cliente']['s0:tipo']['#text'] + ";base64, " + inf;

                  pregunta.cliente = cliente;


                  preguntas.push(pregunta);
                  resolve(preguntas);
                });
              }
            }
          }
        }
        // Send the POST request
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.send(sr);
      }, 1500);
    });

  }





  public crearPregunta(pregunta:Pregunta){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
    let sr=
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service" xmlns:ser="servicios.soapServices">'+
      '<soapenv:Header/>'+
        '<soapenv:Body>'+
          '<djan:createPregunta>'+

           '<djan:pregun>'+

            '<ser:pregunta>'+ pregunta.pregunta+'</ser:pregunta>'+

            '<ser:idServicio>'+ pregunta.idServicio+'</ser:idServicio>'+

            '<ser:nombreUsuario>'+pregunta.cliente.email+'</ser:nombreUsuario>'+
           '</djan:pregun>'+
        '</djan:createPregunta>'+
      '</soapenv:Body>'+
    '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
              console.log("Se creó la pregunta");
            }
      }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
  }

  public agregarRespuesta(pregunta:Pregunta){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
    let sr=
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
      '<soapenv:Header/>'+
        '<soapenv:Body>'+
          '<djan:agregarRespuesta>'+
            '<djan:respuesta>'+ pregunta.respuesta+'</djan:respuesta>'+
            '<djan:idPregunta>'+ pregunta.id+'</djan:idPregunta>'+
        '</djan:agregarRespuesta>'+
      '</soapenv:Body>'+
    '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
              console.log("Se creó la pregunta");
            }
      }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
  }

}
