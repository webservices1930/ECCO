
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ServiciossComponent } from './components/mostrarservicio/servicioss/servicioss.component';
import { CrearservicioComponent } from './components/crearservicio/crearservicio.component';
import { PagoComponent } from './components/pago/pago.component';


const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'servicioss', component: ServiciossComponent },
  { path: 'servicio/:id', component: ServicioComponent },
  { path: 'buscar/:termino', component: BuscadorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'crearservicio', component: CrearservicioComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'pago', component: PagoComponent },

  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});
