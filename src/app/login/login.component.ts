import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebService } from '../web.service';
import { Router } from '@angular/router';

/**
 * A component containing logic that enables user login.
 */
@Component({
  selector: 'login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  providers: [WebService],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  /**
   * A variable used to store the input of the username.
   */
  username: string = '';
  /**
   * A variable used to store the input of the password.
   */
  password: string = '';
  /**
   * A variable used to store error responses from the backend so they can be displayed to the user.
   */
  errorMessage: string = '';

  /**
   * The Login component constructor.
   * @param webService Injected Web Service.
   * @param router Injected Router.
   */
  constructor(private webService: WebService, private router: Router) {}

  /**
   * Passes username and password to the Web Service. If an error is sent from the backend the message is stored in the errorMessage variable.
   */
  onLogin() {
    this.webService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        localStorage.setItem('x-access-token', response.token);
        this.errorMessage = '';
        this.router.navigateByUrl('/profile').then(() => {
          window.location.reload();
        });
      },
      error: (err: any) => {
        this.errorMessage =
          err.error?.message || 'Unsuccessful login attempt, please try again.';
      },
    });
  }
}
