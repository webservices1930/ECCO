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
  base64data: string;
  ext : string;
  image :string;
  usuarioMostrar: Usuario;
  usuariosCopia:Usuario[]=[];
  usuario: Usuario = new Usuario (
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  );
  constructor( private route: ActivatedRoute,
    private router: Router,
    private usuarioService:UsuarioService,
    private sanitization:DomSanitizer
    ) {

      this.base64data=" ";
      this.ext=" ";

    }

  ngOnInit() {
    this.route.params.subscribe( params =>{
      this.user=params['user'];
      console.log(this.user);
        this.usuarioService.getUsuariosJSON().then(res => {
        this.usuarios=res;
        console.log(this.usuarios);
        this.usuarios.forEach(element => {
          this.usuario = new Usuario (
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
          );
          console.log(element['s0:nombre']['#text']);
          this.usuario.nombre = element['s0:nombre']['#text'];
          this.usuario.descripcion=element['s0:descripcion']['#text'];
          this.usuario.edad=+element['s0:edad']['#text'];
          this.usuario.telefono=element['s0:telefono']['#text'];
          this.usuario.img=element['s0:foto']['#text'];
          this.usuario.tipo=element['s0:tipo']['#text'];
          this.usuario.email=element['s0:nombreUsuario']['#text'];
          let inf= element['s0:foto']['#text'];
          this.image="data:image/"+element['s0:tipo']['#text']+";base64, "+inf.slice(2,inf.length-1);
          this.usuariosCopia.push(this.usuario);
          console.log(this.usuariosCopia);
        });
          this.usuariosCopia.forEach(element => {
              if(element.email===this.user){
                this.usuarioMostrar=element;
                console.log(this.usuarioMostrar);
              }
          });
      });
    });
  }
  public getSantizeUrl() {
    return this.sanitization.bypassSecurityTrustUrl(this.image);
 }
}
