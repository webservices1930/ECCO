import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CarritoCompras } from '../model/carrito-compras';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(private http: HttpClient) {}

   public pago(idCliente) {
    const url = `${environment.baseUrl}/usuario/carrito/${idCliente}`;
    return this.http.delete<CarritoCompras>(url);
  }
}
