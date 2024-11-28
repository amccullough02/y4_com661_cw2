import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StarsComponent } from './stars/stars.component';
import { StarsystemComponent } from './starsystem/starsystem.component';

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
];
