import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ProveedorService } from '../../servicios/proveedor.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from '../../model/usuario';
import { Proveedor } from '../../model/proveedor';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  url = '';
  id = '';


  base64data: string;
  ext : string;
  image :string;

  public selectedFile;
  imgURL:any;
  tipo="";

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

  proveedor: Proveedor = new Proveedor (
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  );

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private sanitization:DomSanitizer,
      private usuarioService: UsuarioService,
      private proveedorService: ProveedorService
  ) {
    this.base64data=" ";
     this.ext=" ";
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required]],
      edad:['', Validators.required],
      telefono:['', Validators.required],
      descripcion:['', Validators.required],
      tipo:['', Validators.required],
      foto:['',Validators.required],
      paginaweb:['', ],
      contacto:['', ]
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if(this.registerForm.invalid){
      alert("Ingrese todos los campos por favor");
    }else if(this.tipo === 'Proveedor'){
       this.proveedor.nombre = this.registerForm.value.nombres;
        this.proveedor.nombreUsuario = this.registerForm.value.email;
        this.proveedor.edad = this.registerForm.value.edad;
        this.proveedor.descripcion = this.registerForm.value.descripcion;
        this.proveedor.telefono = this.registerForm.value.telefono;
        this.proveedor.contrasena = this.registerForm.value.password;
        this.proveedor.paginaWeb =this.registerForm.value.paginaweb;
        this.proveedor.contactoRS =this.registerForm.value.contacto;
        this.proveedor.foto = this.base64data;
        this.proveedorService.registrarProveedor(this.proveedor).subscribe(
          results => {
            console.log(results);
            this.router.navigate(['login']);
            alert("Se creó el proveedor satisfactoriamente");

          },
          error => {
            console.error(error);
            alert("No se creó el proveedor. Por favor intente nuevamente");
          }
        )
      }else{
        this.usuario.nombre = this.registerForm.value.nombres;
        this.usuario.nombreUsuario = this.registerForm.value.email;
        this.usuario.edad = this.registerForm.value.edad;
        this.usuario.descripcion = this.registerForm.value.descripcion;
        this.usuario.telefono = this.registerForm.value.telefono;
        this.usuario.contrasena = this.registerForm.value.password;
        this.usuario.foto = this.base64data;
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
  }

  cambiar(){
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsBinaryString(event.target.files[0]);
      this.ext=event.target.files[0].type;
      reader.onload = (event) => { // called once readAsDataURL is completed
            this.base64data=btoa(reader.result as string);
      }
    }
  }

}
