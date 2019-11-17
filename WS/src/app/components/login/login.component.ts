import { Component, OnInit, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SesionService } from '../../servicios/sesion.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
declare var FB: any;


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  navbar: NavbarComponent;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sesionService:SesionService,
    private usuarioService: UsuarioService,

    ) { }

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


  ngOnInit() {
    this.fbLibrary();

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }


  fbLibrary() {
 
    (window as any).fbAsyncInit = function() {
      window['FB'].init({
        appId      : '2327416410905894',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.1'
      });
      window['FB'].AppEvents.logPageView();
    };
 
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
 
}

login() {
 
  window['FB'].login((response) => {
      console.log('login response',response);
      if (response.authResponse) {

        window['FB'].api('/me', {
          fields: 'last_name, first_name, email, picture'
        }, (userInfo) => {

          console.log("user information");
          console.log(userInfo);
          this.sesionService.login(userInfo.email,userInfo.email).subscribe( res => {
            if(res.tipo !== 'cliente'){
              this.usuario.nombre = userInfo.first_name;
              this.usuario.nombreUsuario = userInfo.email;
              this.usuario.edad = 20;
              this.usuario.descripcion = "Ingresaste con facebook";
              this.usuario.telefono = 313226877;
              this.usuario.contrasena = userInfo.email;
              this.usuario.foto = userInfo.picture;
              this.usuarioService.registrarUsuario(this.usuario).subscribe(
                results => {
                  console.log(results);
                  this.router.navigate(['login']);
                  alert("Se creó el usuario satisfactoriamente");
      
                },
                error => {
                  console.error(error);
                  alert("No se creó el usuario. Por favor intente nuevamente");
                }
              )
            }
          })
        });
         
      } else {
        console.log('User login failed');
      }
  }, {scope: 'email'});
}

  onSubmit() {

    this.submitted = true;
    this.sesionService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe( res => {
      this.sesionService.reiniciarCarrito();
      console.log(res);
      if(res.tipo === 'cliente'){
        this.sesionService.sesion = 'usuario' ;
        this.sesionService.sesionCambio.next('usuario');
        this.sesionService.id = res.idUsuario ;
        this.sesionService.idCambio.next(res.idUsuario);
        this.sesionService.loginSatisfactorio(res.idUsuario,'usuario');
        this.router.navigate(['servicioss']);
      }else if(res.tipo === 'proveedor'){
        this.sesionService.sesion = 'proveedor';
          this.router.navigate(['servicioss']);
          this.sesionService.sesionCambio.next('proveedor');
          this.sesionService.id = res.idUsuario ;
          this.sesionService.idCambio.next(res.idUsuario);
          this.sesionService.loginSatisfactorio(res.idUsuario,'proveedor');
      }else{
        alert('Usuario incorrecto');
      }

  })
  }

  registro(){
    this.router.navigate(['register']);
  }

}
