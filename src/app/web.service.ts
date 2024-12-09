import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

/**
 * The Web Service provides access to the endpoints of the Extrasolar Bodies Database API.
 */
@Injectable()
export class WebService {
  /**
   * The default page size.
   */
  pageSize: number = 12;
  /**
   * The default page number.
   */
  pageNumber: number = 1;

  /**
   * The constructor for the Web Service.
   * @param http Injection of HttpClient into the Web Service.
   */
  constructor(private http: HttpClient) {}

  /**
   * Register a new user with the application.
   * @param newUserData The formdata for the new user.
   * @returns An observable containing the backend response.
   */
  register(newUserData: FormData) {
    return this.http.post<any>(
      'http://127.0.0.1:5000/api/v1.0/register',
      newUserData
    );
  }

  /**
   * Login an existing user with the application.
   * @param username The user's username.
   * @param password The user's password.
   * @returns An observable containing the backend response.
   */
  login(username: string, password: string) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<any>('http://127.0.0.1:5000/api/v1.0/login', {
      headers,
    });
  }

  /**
   * Logout a user from the application.
   * @returns An observable containing the backend response.
   */
  logout() {
    const token = localStorage.getItem('x-access-token');
    const headers = new HttpHeaders({
      'x-access-token': token || '',
    });
    return this.http.get<any>('http://127.0.0.1:5000/api/v1.0/logout', {
      headers,
    });
  }

  /**
   * Acquires a paginated collection of stars.
   * @param pageNumber The page to request.
   * @returns An observable containing a paginated collection of stars.
   */
  getStars(pageNumber?: number) {
    return this.http.get<any>(
      'http://127.0.0.1:5000/api/v1.0/bodies?pn=' +
        pageNumber +
        '&ps=' +
        this.pageSize
    );
  }

  /**
   * Acquires a single star (and its associated planets).
   * @param id The id of the star.
   * @returns An observable containing the star and its planets.
   */
  getStar(id: any) {
    return this.http.get<any>(
      'http://127.0.0.1:5000/api/v1.0/bodies/' + id + '?show_planets=false'
    );
  }

  /**
   * Acquires the number of stars within the MongoDB instance.
   * @returns An observable containing the number of stars.
   */
  getNumOfStars() {
    return this.http
      .get<any>('http://127.0.0.1:5000/api/v1.0/bodies/num_of_stars')
      .pipe(map((response: any[]) => response[0]['Number of stars']));
  }

  /**
   * Acquires the number of the last page.
   * @returns A number of the last page.
   */
  getLastPageNumber() {
    return this.getNumOfStars().pipe(
      map((numOfStars: number) => Math.ceil(numOfStars / this.pageSize))
    );
  }

  /**
   * Acquires a single planet.
   * @param star_id The id of the star the planet is associated with.
   * @param planet_id The id of the planet proper.
   * @returns An observable containing data about the planet.
   */
  getPlanet(star_id: any, planet_id: any) {
    return this.http.get<any>(
      'http://127.0.0.1:5000/api/v1.0/bodies/' +
        star_id +
        '/planets/' +
        planet_id
    );
  }

  /**
   * Creates a new planet.
   * @param id The id of the star the planet is associated with.
   * @param newPlanetData The formdata used to create the new planet.
   * @returns An observable containing the backend response.
   */
  createPlanet(id: any, newPlanetData: FormData) {
    const token = localStorage.getItem('x-access-token');
    const headers = new HttpHeaders({
      'x-access-token': token || '',
    });

    return this.http.post<any>(
      'http://127.0.0.1:5000/api/v1.0/bodies/' + id + '/planets',
      newPlanetData,
      { headers }
    );
  }

  /**
   * Modifies an existing planet.
   * @param star_id The id of the star the planet is associated with.
   * @param planet_id The id of the planet proper.
   * @param editPlanetData The formdata used to modify the planet.
   * @returns An obvservable containing the backend response.
   */
  editPlanet(star_id: any, planet_id: any, editPlanetData: FormData) {
    const token = localStorage.getItem('x-access-token');
    const headers = new HttpHeaders({
      'x-access-token': token || '',
    });

    return this.http.put<any>(
      'http://127.0.0.1:5000/api/v1.0/bodies/' +
        star_id +
        '/planets/' +
        planet_id,
      editPlanetData,
      { headers }
    );
  }

  /**
   * Deletes a planet.
   * @param star_id The id of the star the planet is associated with.
   * @param planet_id The id of the planet proper.
   * @returns An observable containing the backend response.
   */
  deletePlanet(star_id: any, planet_id: any) {
    const token = localStorage.getItem('x-access-token');
    const headers = new HttpHeaders({
      'x-access-token': token || '',
    });
    return this.http.delete<any>(
      'http://127.0.0.1:5000/api/v1.0/bodies/' +
        star_id +
        '/planets/' +
        planet_id,
      { headers }
    );
  }

  /**
   * Acquires an unpaginated list of logs from backend.
   * @returns An observable containing all database logs.
   */
  getLogs() {
    const token = localStorage.getItem('x-access-token');
    const headers = new HttpHeaders({
      'x-access-token': token || '',
    });
    return this.http.get<any>('http://127.0.0.1:5000/api/v1.0/all_logs', {
      headers,
    });
  }
}
