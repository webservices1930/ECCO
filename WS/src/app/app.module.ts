import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// Rutas
import { APP_ROUTING } from './app.routes';

// Servicios
import { ServicioService } from './servicios/servicio.service';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { ServicioTarjetaComponent } from './components/mostrarservicio/servicio-tarjeta/servicio-tarjeta.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { CartComponent } from './components/shoppingcart/cart/cart.component';
import { SesionService } from './servicios/sesion.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsuarioService } from './servicios/usuario.service';
import { CrearservicioComponent } from './components/crearservicio/crearservicio.component';
import { ServiciossComponent } from './components/mostrarservicio/servicioss/servicioss.component';
import { PagoComponent } from './components/pago/pago.component';
import { EditarservicioComponent } from './components/editarservicio/editarservicio.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ServicioComponent,
    ServiciossComponent,
    BuscadorComponent,
    ServicioTarjetaComponent,
    ShoppingcartComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    CrearservicioComponent,
    ProfileComponent,
    PagoComponent,
    EditarservicioComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    APP_ROUTING,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ServicioService
    ,SesionService,
    UsuarioService,
    CartComponent

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
