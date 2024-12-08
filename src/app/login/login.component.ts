import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebService } from '../web.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  providers: [WebService],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private webService: WebService, private router: Router) {}

  onLogin() {
    this.webService
      .login(this.username, this.password)
      .subscribe((response: any) => {
        console.log(response);
        localStorage.setItem('x-access-token', response.token);
      });
    this.router.navigateByUrl('/profile');
  }
}
