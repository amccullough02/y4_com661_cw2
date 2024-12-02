import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StarsComponent } from './stars/stars.component';
import { StarsystemComponent } from './starsystem/starsystem.component';
import { LoginComponent } from './login/login.component';
import { NewPlanet } from './newplanet/newplanet.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'stars',
    component: StarsComponent,
  },
  {
    path: 'stars/:id',
    component: StarsystemComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'new_planet/:id',
    component: NewPlanet,
  },
];
