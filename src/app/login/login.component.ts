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
   * The Login component constructor.
   * @param webService Injected Web Service.
   * @param router Injected Router.
   */
  constructor(private webService: WebService, private router: Router) {}

  /**
   * Passes username and password to the Web Service.
   */
  onLogin() {
    this.webService
      .login(this.username, this.password)
      .subscribe((response: any) => {
        localStorage.setItem('x-access-token', response.token);
      });
    this.router.navigateByUrl('/profile');
  }
}
