import { Component, OnInit } from '@angular/core';
import {xmlToJson} from '../../servicios/lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
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
              let data=doc['soap11env:Envelope']['soap11env:Body']['tns:getAllUsuariosResponse']['tns:getAllUsuariosResult'];
              console.log(data);
          }
      }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
  }


}
