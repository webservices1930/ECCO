import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../../../servicios/sesion.service';
import { s } from '@angular/core/src/render3';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  private sesion = "usuario";
  private user="g"
  constructor( private router:Router,
              private sesionService:SesionService
    ) { }

  ngOnInit() {
    document.title = 'ECCO';
    this.sesion=this.sesionService.getSesion();
    console.log(this.sesion);

  }

  buscarServicio( termino:string ){
    // console.log(termino);
    this.router.navigate( ['/buscar',termino] );
  }

}
