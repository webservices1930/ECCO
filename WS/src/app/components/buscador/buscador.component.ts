import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from '../../servicios/servicio.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  servicios:any[] = []
  termino:string;

  serviciosCopia: any= [];

  constructor( private activatedRoute:ActivatedRoute,
              private _serviciosService: ServicioService,
              private router:Router) {

  }

  ngOnInit() {

    this.activatedRoute.params.subscribe( params =>{
      this.termino =params['termino'];
      console.log("TERMNDFODOO"+this.termino);
      this.servicios = this._serviciosService.buscarServicios( params['termino'] );
      this.serviciosCopia = this._serviciosService.buscarServicios( params['termino'] );
      console.log( this.servicios );
    });

  }

  filtrarServicio( termino:string ){
    console.log(termino);
       var i=0;
       this.serviciosCopia=[];
       console.log(this.servicios);
       this.servicios.forEach(element => {
         if(element.tipo.toLocaleLowerCase() === termino.toLocaleLowerCase() || termino===""){
           this.serviciosCopia.push(element);
         }
         i++;
       });
   }

   buscarServicio( termino:string ){
     console.log(termino);
     this.router.navigate( ['/buscar',termino] );
   }

}
