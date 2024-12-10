import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { WebService } from '../web.service';
import { CommonModule, DecimalPipe, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * A component used to display a table of stars and their data.
 */
@Component({
  selector: 'stars',
  standalone: true,
  imports: [CommonModule, DecimalPipe, RouterModule],
  providers: [WebService],
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.css',
})
export class StarsComponent {
  /**
   * Used to store the current page of star data.
   */
  stars_list: any;
  /**
   * The current page.
   */
  page: number = 1;
  /**
   * The number of the last page.
   */
  lastPageNumber: number = 0;

  /**
   * The component used for the Stars component.
   * @param webService Injected Web Service.
   * @param platformId Injected Platform ID, necessary to differentiate between browser sessions.
   */
  constructor(
    public webService: WebService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Initialisation method for the Stars component.
   */
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (sessionStorage['page']) {
        this.page = Number(sessionStorage['page']);
      }
    }
    this.webService.getStars(1).subscribe((response) => {
      this.stars_list = response;
    });
    this.webService.getLastPageNumber().subscribe((response: any) => {
      this.lastPageNumber = response;
    });
  }

  /**
   * Naviagtes to the previous page if possible.
   */
  previousPage() {
    if (this.page > 1) {
      this.page = this.page - 1;
      sessionStorage['page'] = this.page;
      this.webService.getStars(this.page).subscribe((response: any) => {
        this.stars_list = response;
      });
    }
  }

  /**
   * Navigates to the next page if possible.
   */
  nextPage() {
    this.webService.getLastPageNumber().subscribe((lastPageNumber: number) => {
      if (this.page < lastPageNumber) {
        this.page = this.page + 1;
        sessionStorage['page'] = this.page;
        this.webService.getStars(this.page).subscribe((response: any) => {
          this.stars_list = response;
        });
      }
    });
  }

  /** 
   * Provides a unique identifier for the stars_list, used in the HTML component.
  */
  trackByName(index: number, star: any): string {
    return star.name;
  }
}
