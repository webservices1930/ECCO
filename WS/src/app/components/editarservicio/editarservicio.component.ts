import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SesionService } from 'src/app/servicios/sesion.service';

@Component({
  selector: 'app-editarservicio',
  templateUrl: './editarservicio.component.html',
  styleUrls: ['./editarservicio.component.css']
})
export class EditarservicioComponent implements OnInit {
  servicio=[];
  servicioid;
  userid;
  servicioProveedorid;
  base64data: string;
  ext : string;
  image :string;

  constructor( private activatedRoute: ActivatedRoute,
    private _serviciosService: ServicioService,
    private sanitization:DomSanitizer,
    private _sesionService:SesionService,
    private router:Router
){

}

  ngOnInit() {
    this.activatedRoute.params.subscribe( params =>{
      this.servicioid = params['id'];
      this._serviciosService.getServicioId(params['id']).subscribe(res => {
          this.servicio[0]=res;
          console.log(this.servicio[0]);
          this.userid = this._sesionService.id;
       });
    });
  }

  regresar(){
    this.router.navigate( ['/servicio', this.servicioid] );
  }

  public getSantizeUrl() {
    let image = "data:image/.jpg;base64, "+this.servicio[0].foto;
    return this.sanitization.bypassSecurityTrustUrl(image);
 }
 onSelectFile(event) { // called each time file input changes
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    this.ext=event.target.files[0].type;
    reader.onload = (event) => { // called once readAsDataURL is completed
        this.servicio[0].foto=btoa(reader.result as string);
      }
    }
  }
  guardar(){
    this._serviciosService.updateServicio(this.servicio[0]).subscribe(
      results => {
        console.log(results);
        this.router.navigate(['servicioss']);
        alert("Se actualizó el servicio satisfactoriamente");

      },
      error => {
        console.error(error);
        alert("No se actualizó el servicio. Por favor intente nuevamente");
      }
    )

  }

}
