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
      console.log(params['id']);
      this.servicioid = params['id'];
      this._serviciosService.getServicioId(params['id']).then(res => {
          this.servicio[0]=res[0];
          console.log(this.servicio[0]);
          this.servicioProveedorid=res[0].nombreproveedor;
          this.userid = this._sesionService.id;
          console.log(this.userid + this.servicioProveedorid);
       });
    });
  }
public getSantizeUrl(img) {
  //console.log(img);
  //console.log(this.sanitization.bypassSecurityTrustUrl(img));
  return this.sanitization.bypassSecurityTrustUrl(img);
}
  regresar(){
    this.router.navigate( ['/servicio', this.servicioid] );
  }

  guardar(){
    console.log(this.servicio[0]);
    console.log(this.servicio[0].img.split(";",1)[0]);
    console.log(this.servicio[0].img.split(" ",2)[1]);
    this._serviciosService.updateServicio(this.servicio[0]);
  }
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
}
