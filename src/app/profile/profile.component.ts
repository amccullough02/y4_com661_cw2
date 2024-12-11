import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WebService } from '../web.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

/**
 * A simple component used to display information about the currently authenticated user.
 */
@Component({
  selector: 'profile',
  standalone: true,
  imports: [RouterModule, CommonModule],
  providers: [WebService, AuthService],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  userData: any;

  /**
   * The constructor for the Profile component.
   * @param authService Injected Auth Service.
   * @param webService Injected Web Service.
   */
  constructor(public authService: AuthService, public webService: WebService) {}

  ngOnInit() {
    this.webService
      .getUser(this.authService.getUsername())
      .subscribe((response: any) => {
        this.userData = response;
      });
  }
}
