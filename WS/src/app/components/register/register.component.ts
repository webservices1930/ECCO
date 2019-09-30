import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ProveedorService } from '../../servicios/proveedor.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

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


  tipo="";
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
        this.proveedorService.registrarProveedor(this.registerForm,this.base64data,this.ext);
        this.router.navigate(['login']);
      }else{
        this.usuarioService.registrarUsuario(this.registerForm,this.base64data,this.ext);
        this.router.navigate(['login']);
      }
  }

  cambiar(){
    console.log(this.tipo);
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
