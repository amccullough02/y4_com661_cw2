import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { get } from 'node:http';

@Injectable()
export class WebService {
  pageSize: number = 16;
  pageNumber: number = 1;

  constructor(private http: HttpClient) {}

  getStars(pageNumber?: number) {
    return this.http.get<any>(
      'http://localhost:5000/api/v1.0/bodies?pn=' +
        pageNumber +
        '&ps=' +
        this.pageSize
    );
  }

  getLastPageNumber() {}
}
