import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../model/usuario';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  usuarios;
  usuariosCopia:Usuario[]=[];
  usuarioMostrar;
  constructor( private route: ActivatedRoute,
    private router: Router,
    private usuarioService:UsuarioService,
    private sanitization:DomSanitizer
    ) {



    }

  ngOnInit() {
    this.route.params.subscribe( params =>{
      this.user = params['user'];
      console.log(this.user);
        this.usuarioService.getUsuarioByUsernameJSON(this.user).then( res => {
          this.usuarioMostrar = res;
          console.log(this.usuarioMostrar);
        });
    });
  }
  public getSantizeUrl() {
    let image = "data:image/"+this.usuarioMostrar.tipo+";base64, "+this.usuarioMostrar.img.slice(2,this.usuarioMostrar.img.length-1);
    return this.sanitization.bypassSecurityTrustUrl(image);
 }
}
