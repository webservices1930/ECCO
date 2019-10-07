import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../../../servicios/sesion.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sesion = "sininiciar";
  private user;
  _subscription: any;
  constructor(private router:Router,
              private sesionService:SesionService
    ) {
      this.sesion = sesionService.sesion;
      //this.sesion=sesionService.getUserLoggedIn();
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
    //this.sesionService.sesion = 'sininiciar';
    //this.sesionService.sesionCambio.next('sininiciar');
    this.sesionService.loginSatisfactorio('','sininiciar');
    this.sesion='sininiciar';

  }


}
