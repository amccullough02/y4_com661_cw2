import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StarsComponent } from './stars/stars.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'stars',
    component: StarsComponent,
  },
];
