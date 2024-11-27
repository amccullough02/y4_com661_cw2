import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebService } from '../web.service';

@Component({
  selector: 'stars',
  standalone: true,
  imports: [RouterOutlet],
  providers: [WebService],
  templateUrl: './stars.component.html',
})
export class StarsComponent {
  stars_list: any;

  constructor(public webService: WebService) {}

  ngOnInit() {
    this.webService.getStars(10).subscribe((response) => {
      this.stars_list = response;
    });
  }
}
