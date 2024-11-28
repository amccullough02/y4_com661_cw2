import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WebService {
  pageSize: number = 12;
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

  getNumOfStars() {
    return this.http
      .get<any>('http://localhost:5000/api/v1.0/bodies/num_of_stars')
      .pipe(map((response: any[]) => response[0]['Number of stars']));
  }

  getLastPageNumber() {
    return this.getNumOfStars().pipe(
      map((numOfStars: number) => Math.ceil(numOfStars / this.pageSize))
    )
  }
}
