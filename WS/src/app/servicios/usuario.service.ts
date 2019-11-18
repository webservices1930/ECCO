import { Injectable } from '@angular/core';
import {xmlToJson} from './lib';
import { Usuario } from '../model/usuario';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { environment } from 'src/environments/environment';
import { RequestService } from '../Request/request.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarios;
  usuariosCopia: Usuario[] = [];
  ext: string;
  base64data: string;

  image: string;
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
  constructor(private request: RequestService) {
    this.base64data = " ";
    this.ext = " ";
   }

  async getUsuariosJSON(){
      const url = `${environment.baseUrl}/usuario/cliente`;
      return this.request.get<Usuario[]>(url);
    }

  getUsuarioByUsernameJSON(idusuario){
    const url = `${environment.baseUrl}/usuario/cliente/${idusuario}`;
    return this.request.get<Usuario>(url);
  }

  updateUsuario(usuario){
    const url = `${environment.baseUrl}/usuario/cliente/${usuario.id}`;
    return this.request.put(url, {
      nombre: usuario.nombre,
      nombreUsuario: usuario.nombreUsuario,
      edad:usuario.edad,
      contrasena:usuario.contrasena,
      descripcion:usuario.descripcion,
      foto:usuario.foto,
      telefono:usuario.telefono
    });
    }

  borrarUsuario(usuario){
    const url = `${environment.baseUrl}/usuario/cliente/${usuario.id}`;
    return this.request.delete(url, {
      nombre: usuario.nombre,
      nombreUsuario: usuario.nombreUsuario,
      edad:usuario.edad,
      contrasena:usuario.contrasena,
      descripcion:usuario.descripcion,
      foto:usuario.foto,
      telefono:usuario.telefono
    });
  }

      registrarUsuario(usuario:Usuario){
        const url = `${environment.baseUrl}/usuario/cliente`;
        return this.request.post(url, {
          nombre: usuario.nombre,
          nombreUsuario: usuario.nombreUsuario,
          edad:usuario.edad,
          contrasena:usuario.contrasena,
          descripcion:usuario.descripcion,
          foto:usuario.foto,
          telefono:usuario.telefono
        });
      }
  }
