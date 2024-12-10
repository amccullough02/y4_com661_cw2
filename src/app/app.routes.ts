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
import { LogsComponent } from './logs/logs.component';
import { RegisterComponent } from './register/register.component';
import { TestComponent } from './test/test.component';

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
    path: 'register',
    component: RegisterComponent,
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
  {
    path: 'logs',
    component: LogsComponent,
  },
  {
    path: 'test',
    component: TestComponent,
  },
];
