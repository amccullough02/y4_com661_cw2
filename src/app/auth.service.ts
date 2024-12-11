import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

/**
 * The Authentication Service provides access to the current state of the user.
 */
@Injectable()
export class AuthService {
  /**
   * The x-access-token of the active user.
   */
  token: any = this.decodeToken();

  get isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!window.localStorage.getItem('x-access-token');
    }
    return false;
  }

  /**
   * Decodes the x-access-token.
   * @returns A decoded token value if a token is present, otherwise null.
   */
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

  /**
   * Acquires the username of the active user.
   * @returns The username of the active user.
   */
  getUsername() {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (this.token) {
        return this.token.user;
      }
      return null;
    }
    return null;
  }

  /**
   * Checks if the current user is an admin.
   * @returns A boolean based on the user's is_admin property.
   */
  get checkIfAdmin() {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (this.token) {
        return this.token.is_admin == true;
      }
      return false;
    }
    return false;
  }
}
