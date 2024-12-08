import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StarsComponent } from './stars/stars.component';
import { StarsystemComponent } from './starsystem/starsystem.component';
import { LoginComponent } from './login/login.component';
import { NewPlanet } from './newplanet/newplanet.component';
import { PlanetComponent } from './planet/planet.component';
import { EditPlanetComponent } from './editplanet/editplanet.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
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
    path: 'new_planet/:id',
    component: NewPlanet,
  },
  {
    path: 'planets/:id',
    component: PlanetComponent,
  },
  {
    path: 'edit_planet/:id',
    component: EditPlanetComponent,
  },
];
