import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Rutas
import { APP_ROUTING } from './app.routes';

// Servicios
import { ServicioService } from './servicios/servicio.service';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServiciossComponent } from './components/servicioss/servicioss.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { ServicioTarjetaComponent } from './components/servicio-tarjeta/servicio-tarjeta.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { CartComponent } from './components/shoppingcart/cart/cart.component';
import { SesionService } from './servicios/sesion.service';



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

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING,  
  ],
  providers: [
    ServicioService
    ,SesionService,
    CartComponent

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
