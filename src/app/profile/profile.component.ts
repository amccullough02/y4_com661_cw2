import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

/**
 * A simple component used to display information about the currently authenticated user.
 */
@Component({
  selector: 'profile',
  standalone: true,
  imports: [RouterModule],
  providers: [AuthService],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  /**
   * The constructor for the Profile component.
   * @param authService Injected Auth Service.
   */
  constructor(public authService: AuthService) {}
}
