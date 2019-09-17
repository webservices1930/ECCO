import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {xmlToJson} from './lib';
import * as $ from 'jquery';


@Component({
  selector: 'app-registry-form',
  templateUrl: './registry-form.component.html',
  styleUrls: ['./registry-form.component.css']
})

export class RegistryFormComponent implements OnInit {


  base64data: string;
  ext : string; 
  image :string;
  constructor(private sanitization:DomSanitizer) {
     this.base64data=" ";
     this.ext=" ";
   }

  ngOnInit() {

  }
  //kkkk
  
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      
      reader.readAsBinaryString(event.target.files[0]);
      
      this.ext=event.target.files[0].type;
      reader.onload = (event) => { // called once readAsDataURL is completed
            this.base64data=btoa(reader.result as string);
            console.log(this.base64data);
      }
    }
  }

  upload(event){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://localhost:8000/soap/', true);
    let sr='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service" xmlns:ser="servicios.soapServices">'+
    '<soapenv:Header/>'+
    '<soapenv:Body>'+
       '<djan:crearUsuario>'+
          '<!--Optional:-->'+
          '<djan:cliente>'+
            '<!--Optional:-->'+
            '<ser:nombreUsuario>randyD</ser:nombreUsuario>'+
             '<!--Optional:-->'+
             '<ser:nombre>Randy Darrell</ser:nombre>'+
             '<!--Optional:-->'+
             '<ser:edad>19</ser:edad>'+
             '<!--Optional:-->'+
             `<ser:foto>${this.base64data}</ser:foto>`+
             '<!--Optional:-->'+
             `<ser:tipo>${this.ext}</ser:tipo>`+
             '<!--Optional:-->'+
             '<ser:descripcion>nada</ser:descripcion>'+
             '<!--Optional:-->'+
             '<ser:telefono>32145</ser:telefono>'+
          '</djan:cliente>'+
       '</djan:crearUsuario>'+
    '</soapenv:Body>'+
 '</soapenv:Envelope>';
    
 let ssr='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
 '<soapenv:Header/>'+
 '<soapenv:Body>'+
    '<djan:suma>'+
       '<!--Optional:-->'+
       '<djan:a>2</djan:a>'+
       '<!--Optional:-->'+
       '<djan:b>4</djan:b>'+
    '</djan:suma>'+
 '</soapenv:Body>'+
'</soapenv:Envelope>';

 xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
            alert(xmlhttp.responseText);
            // alert('done. use firebug/console to see network response');
        }
    }
  }
  // Send the POST request
  xmlhttp.setRequestHeader('Content-Type', 'text/xml');
  xmlhttp.send(sr);
    
  }

  getEvent(event){
   var xmlhttp = new XMLHttpRequest();
   xmlhttp.open('POST', 'http://localhost:8000/soap/', true);
   let sr='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:djan="django.soap.service">'+
   '<soapenv:Header/>'+
   '<soapenv:Body>'+
      '<djan:readUsuario>'+
         '<!--Optional:-->'+
         '<djan:userName>randyD45</djan:userName>'+
      '</djan:readUsuario>'+
      '</soapenv:Body>'+
   '</soapenv:Envelope>';
   
   var y=this;
   xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
         if (xmlhttp.status == 200) {
            
            var doc =  xmlToJson(xmlhttp.responseXML);
            let data=doc['soap11env:Envelope']['soap11env:Body']['tns:readUsuarioResponse']
            y.up(data);
            // alert('done. use firebug/console to see network response');
         }

            
      }
      
   }
  // Send the POST request
  xmlhttp.setRequestHeader('Content-Type', 'text/xml');
  xmlhttp.send(sr);

  }

   up(data:JSON){
      
      console.log(data['tns:readUsuarioResult0']);
      console.log(data['tns:readUsuarioResult1']);
      let usuData=data['tns:readUsuarioResult1'];
      let inf=usuData['s0:foto']['#text'];
      this.image="data:image/"+usuData['s0:tipo']['#text']+";base64, "+inf.slice(2,inf.length-1);
   }

   public getSantizeUrl() {
      return this.sanitization.bypassSecurityTrustUrl(this.image);
   }

   
}

