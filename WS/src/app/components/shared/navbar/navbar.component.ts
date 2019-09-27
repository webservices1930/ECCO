import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../../../servicios/sesion.service';
import { s } from '@angular/core/src/render3';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  sesion = "sininiciar";
  private user;
  _subscription: any;
  constructor(private router:Router,
              private sesionService:SesionService
    ) {
      this.sesion = sesionService.sesion;
      this._subscription = sesionService.sesionCambio.subscribe((value)=>{
          this.sesion = value;
      })
    }

  ngOnInit() {
    document.title = 'ECCO';
  }

  buscarServicio( termino:string ){
    // console.log(termino);
    this.router.navigate( ['/buscar',termino] );
  }

  logout(){
    this.sesionService.sesion = 'sininiciar';
    this.sesionService.sesionCambio.next('sininiciar');
    console.log(this.sesion);

  }


}
