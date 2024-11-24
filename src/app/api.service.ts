import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private getAllStarsUrl = 'http://127.0.0.1:5000/api/v1.0/bodies';

  constructor(private http: HttpClient) {}

  getAllStars(): Observable<any> {
    return this.http.get<any>(this.getAllStarsUrl);
  }
}
