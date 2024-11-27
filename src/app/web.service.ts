import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {
  pageSize: number = 10;

  constructor(private http: HttpClient) {}

  getStars(page: number) {
    return this.http.get<any>(
      'http://localhost:5000/api/v1.0/bodies?pn=' +
        page +
        '&ps=' +
        this.pageSize
    );
  }
}
