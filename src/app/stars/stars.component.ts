import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'stars',
  standalone: true,
  imports: [RouterOutlet],
  providers: [ApiService],
  templateUrl: './stars.component.html',
})
export class StarsComponent {
  stars_list: any;

  constructor(public apiService: ApiService) {}

  ngOnInit() {
    this.stars_list = this.apiService.getAllStars();
  }
}
