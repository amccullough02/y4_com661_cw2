import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  token: any = this.decodeToken();

  constructor() {}

  decodeToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('x-access-token');
      if (token) {
        return jwtDecode(token);
      }
      return null;
    }
    return null;
  }

  getUsername() {
    if (this.token) {
      return this.token.user;
    }
    return '<username>';
  }

  checkIfAdmin() {
    if (this.token) {
      return this.token.is_admin;
    }
    return false;
  }
}
