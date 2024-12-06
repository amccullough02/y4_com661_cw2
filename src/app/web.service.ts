import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class WebService {
  pageSize: number = 12;
  pageNumber: number = 1;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<any>('http://127.0.0.1:5000/api/v1.0/login', {
      headers,
    });
  }

  logout() {
    const token = localStorage.getItem('x-access-token');
    const headers = new HttpHeaders({
      'x-access-token': token || '',
    });
    return this.http.get<any>('http://127.0.0.1:5000/api/v1.0/logout', {
      headers,
    });
  }

  getStars(pageNumber?: number) {
    return this.http.get<any>(
      'http://127.0.0.1:5000/api/v1.0/bodies?pn=' +
        pageNumber +
        '&ps=' +
        this.pageSize
    );
  }

  getStar(id: any) {
    return this.http.get<any>(
      'http://127.0.0.1:5000/api/v1.0/bodies/' + id + '?show_planets=false'
    );
  }

  getNumOfStars() {
    return this.http
      .get<any>('http://127.0.0.1:5000/api/v1.0/bodies/num_of_stars')
      .pipe(map((response: any[]) => response[0]['Number of stars']));
  }

  getLastPageNumber() {
    return this.getNumOfStars().pipe(
      map((numOfStars: number) => Math.ceil(numOfStars / this.pageSize))
    );
  }

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

  getPlanet(star_id: any, planet_id: any) {
    return this.http.get<any>(
      'http://127.0.0.1:5000/api/v1.0/bodies/' +
        star_id +
        '/planets/' +
        planet_id
    );
  }
}
