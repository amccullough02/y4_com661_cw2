import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
/**
 * A simple component used to display the homepage of the applicaiton.
 */
@Component({
  selector: 'home-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
