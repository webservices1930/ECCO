import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../servicios/servicio.service';
import { SesionService } from '../../servicios/sesion.service';

@Component({
  selector: 'app-serviciosproveedor',
  templateUrl: './serviciosproveedor.component.html',
  styleUrls: ['./serviciosproveedor.component.css']
})
export class ServiciosproveedorComponent implements OnInit {
  servicios = [];
  user;
  serviciosCopia: any= [];
  constructor(private _serviciosService:ServicioService,    private sesionService:SesionService,
    ) { }

  ngOnInit() {
    this.user = this.sesionService.id;
    this._serviciosService.getTodosServicios().then(res =>{
      this.serviciosCopia= res;
      this.serviciosCopia.forEach(element => {
          if(element.nombreproveedor === this.user){
            this.servicios.push(element);
          }
      });
     });
  }

}
