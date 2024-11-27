import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebService } from '../web.service';

@Component({
  selector: 'stars',
  standalone: true,
  imports: [RouterOutlet],
  providers: [WebService],
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.css',
})
export class StarsComponent {
  stars_list: any;
  page: number = 1;

  constructor(public webService: WebService) {}

  ngOnInit() {
    this.webService.getStars(1).subscribe((response) => {
      this.stars_list = response;
    });
  }

  previousPage() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.webService.getStars(this.page).subscribe((response: any) => {
        this.stars_list = response;
      });
    }
  }

  // nextPage() {
  //   if (this.page < this.webService.getLastPageNumber()) {
  //     this.page = this.page + 1;
  //     this.webService.getStars(this.page).subscribe((response: any) => {
  //       this.stars_list = response;
  //     })
  //   }
  // }
}
