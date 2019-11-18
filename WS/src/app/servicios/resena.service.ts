import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Resena } from '../model/resena';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {

  constructor(private http: HttpClient) { }

  
  public crearResena(resena:Resena){
    const url = `${environment.baseUrl}/servicio/${resena.idServicio}/resena/cliente/${resena.cliente.nombreUsuario}/`;
    return this.http.post(url, resena);
  }
  public getResenasServicio(idServicio: number) {
    const url = `${environment.baseUrl}/servicio/${idServicio}/resena/`;
    return this.http.get<any>(url);
  }

}
