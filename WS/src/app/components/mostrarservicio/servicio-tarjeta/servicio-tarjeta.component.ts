import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CartComponent } from '../../shoppingcart/cart/cart.component';
import { SesionService } from 'src/app/servicios/sesion.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Servis } from '../../../model/servis';
import { CarritoCompras } from '../../../model/carrito-compras';
import { UsuarioService } from '../../../servicios/usuario.service';
import { Usuario } from 'src/app/model/usuario';
import { CarritoService } from '../../../servicios/carrito.service';
import { TarjetaCarritoService } from '../../../servicios/tarjeta-carrito.service';


@Component({
  selector: 'app-servicio-tarjeta',
  templateUrl: './servicio-tarjeta.component.html',
  styleUrls: ['./servicio-tarjeta.component.css']
})
export class ServicioTarjetaComponent implements OnInit {

  carrito: CarritoCompras;
  usuario;
  sesion;
  @Input() servicio: any = {};
  @Input() index: number;

  @Output() servicioSeleccionado: EventEmitter<number>;

  // tslint:disable-next-line: max-line-length
  constructor(private sesionService:SesionService ,private router: Router, private _servicioSesion:SesionService,private sanitization:DomSanitizer, private usuarioservice: UsuarioService, private carritoService: CarritoService, private tarjetaCarrito: TarjetaCarritoService) {
    this.servicioSeleccionado = new EventEmitter();
  }

  ngOnInit() {
    this.sesion = this.sesionService.sesion;
    const idUsuario = this._servicioSesion.id;
      /*this.usuarioservice.getUsuarioByUsernameJSON(idUsuario).subscribe( res => {
        this.usuario = res;
        console.log(this.usuario);
      });
      */
    // this.carrito.setCliente(this.usuario);
  }

  verServicio() {
    this.router.navigate( ['/servicio', this.index] );
  }

  agregarServicio(servicio : Servis){
    this.carritoService.agregarAlCarrito(this.usuario, servicio);
    this._servicioSesion.agregarServicio(this.servicio);
    this.tarjetaCarrito.actualizarCarrito();
  }

  public getSantizeUrl(img) {
    return this.sanitization.bypassSecurityTrustUrl(img);
 }
}
