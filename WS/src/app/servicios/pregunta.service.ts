import { Injectable } from '@angular/core';
import { Pregunta } from '../model/pregunta';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(private http: HttpClient) { }


  public getPreguntasServicio(idServicio: number) {
    const url = `${environment.baseUrl}/servicio/pregunta/${idServicio}`;
    return this.http.get<any>(url);
  }



  public crearPregunta(pregunta:Pregunta){
    const url = `${environment.baseUrl}/servicio/pregunta/${pregunta.cliente.nombreUsuario}/${pregunta.idServicio}`;
    return this.http.post(url, pregunta);
  }

  public agregarRespuesta(pregunta:Pregunta){
    const url = `${environment.baseUrl}/servicio/pregunta/${pregunta.id}`;
    return this.http.put(url, pregunta);
  }

}
