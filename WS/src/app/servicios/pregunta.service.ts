import { Injectable } from '@angular/core';
import { Pregunta } from '../model/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor() { }

  /*
  public descargarPreguntas(idServicio:number) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
    let sr=
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
      '<soapenv:Header/>'+
        '<soapenv:Body>'+
          '<djan:getPreguntasServicio>'+
            '<djan:idServicio>' + idServicio + '</djan:idServicio>'+
          '</djan:getPreguntasServicio>'+
        '</soapenv:Body>'+
    '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
              console.log("Se cargaron las preguntas del servicio");
              //falta pasarlas a las preguntas
            }
      }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);

  }

  public crearPregunta(pregunta:Pregunta){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://whatsmusic.pythonanywhere.com/soap/', true);
    let sr=
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
      '<soapenv:Header/>'+
        '<soapenv:Body>'+
          '<djan:createPregunta>'+
            '<djan:pregun>'+
              '<ser:pregunta>' + pregunta.pregunta + '</ser:pregunta>'+
              '<ser:idServicio>' + pregunta.idServicio + '</ser:idServicio>'+
              '<ser:idCliente>'+ pregunta.idCliente +'</ser:idCliente>'+
            '<djan:pregun>'+
          '</djan:createPregunta>'+
        '</soapenv:Body>'+
    '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
              console.log("Se cargaron las preguntas del servicio");
            }
      }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
  }
  */
}
