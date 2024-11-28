import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'stars',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  providers: [WebService],
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.css',
})
export class StarsComponent {
  stars_list: any;
  page: number = 1;
  lastPageNumber: number = 0;

  constructor(public webService: WebService) {}

  ngOnInit() {
    this.webService.getStars(1).subscribe((response) => {
      this.stars_list = response;
    });
    this.webService.getLastPageNumber().subscribe((response: any) => {
      this.lastPageNumber = response;
    })
  }

  previousPage() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.webService.getStars(this.page).subscribe((response: any) => {
        this.stars_list = response;
      });
    }
  }

  nextPage() {
    this.webService.getLastPageNumber().subscribe((lastPageNumber: number) => {
      if (this.page < lastPageNumber) {
        this.page = this.page + 1;
        this.webService.getStars(this.page).subscribe((response: any) => {
          this.stars_list = response;
        });
      }
    });
  }

  trackByName(index: number, star: any): string {
    return star.name;
  }
  
}
