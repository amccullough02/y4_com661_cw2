import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

/**
 * A simple component used to display the navbar of the application.
 */
@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  providers: [AuthService],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  /**
   * The constructor for the Navbar component.
   * @param authService Injected Auth Service.
   */
  constructor(public authService: AuthService) {}
}
