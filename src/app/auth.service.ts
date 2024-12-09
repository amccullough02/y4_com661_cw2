import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthService {
  token: any = this.decodeToken();

  get isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!window.localStorage.getItem('x-access-token');
    }
    return false;
  }

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

  get checkIfAdmin() {
    if (this.token) {
      return this.token.is_admin == true;
    }
    return false;
  }
}
