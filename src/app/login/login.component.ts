import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebService } from '../web.service';

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

  constructor(private webService: WebService) {}

  onLogin() {
    this.webService
      .login(this.username, this.password)
      .subscribe((response: any) => {
        console.log(response);
        localStorage.setItem('auth_token', response.token);
      });
  }
}
