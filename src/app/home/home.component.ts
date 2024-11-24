import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
