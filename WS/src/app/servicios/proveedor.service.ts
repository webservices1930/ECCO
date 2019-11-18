import { Injectable } from '@angular/core';
import { Proveedor } from '../model/proveedor';
import {xmlToJson} from './lib';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';
import { RequestService } from '../Request/request.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  ext: string;
  base64data: string;

  image: string;
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
    undefined,
  );
  constructor(private request: RequestService) {
    this.base64data = " ";
    this.ext = " ";
   }

   proveedores;
   proveedoresCopia: Proveedor[] = [];


  borrarProveedor(proveedor){
    const url = `${environment.baseUrl}/usuario/proveedor/${proveedor.id}`;
    return this.request.delete(url, {
      nombre: proveedor.nombre,
      nombreUsuario: proveedor.nombreUsuario,
      edad:proveedor.edad,
      contrasena:proveedor.contrasena,
      descripcion:proveedor.descripcion,
      foto:proveedor.foto,
      telefono:proveedor.telefono,
      paginaWeb:proveedor.paginaWeb,
      contactoRS:proveedor.contactoRS
    });
  }

  registrarProveedor(proveedor:Proveedor){
    console.log("ssss "+proveedor);

      const url = `${environment.baseUrl}/usuario/proveedor`;
      return this.request.post(url, {
        nombre: proveedor.nombre,
        nombreUsuario: proveedor.nombreUsuario,
        edad:proveedor.edad,
        contrasena:proveedor.contrasena,
        descripcion:proveedor.descripcion,
        foto:proveedor.foto,
        telefono:proveedor.telefono,
        paginaWeb:proveedor.paginaWeb,
        contactoRS:proveedor.contactoRS
      });
  }

  updateProveedor(proveedor) {
    const url = `${environment.baseUrl}/usuario/proveedor/${proveedor.id}`;
    return this.request.put(url, {
      nombre: proveedor.nombre,
      nombreUsuario: proveedor.nombreUsuario,
      edad:proveedor.edad,
      contrasena:proveedor.contrasena,
      descripcion:proveedor.descripcion,
      foto:proveedor.foto,
      telefono:proveedor.telefono,
      paginaWeb:proveedor.paginaWeb,
        contactoRS:proveedor.contactoRS
    });
  }


  async getProveedoresJSON(){
    const url = `${environment.baseUrl}/usuario/proveedor`;
    return this.request.get<Proveedor[]>(url);
  }

  getProveedorByUsernameJSON(idusuario){
  const url = `${environment.baseUrl}/usuario/proveedor/${idusuario}`;
  return this.request.get<Proveedor[]>(url);
}

}
