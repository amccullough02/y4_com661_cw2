import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WebService } from '../web.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

/**
 * A component containing logic that enables presentation of database logs. This component makes use of AG Grid.
 */
@Component({
  selector: 'logs',
  standalone: true,
  imports: [RouterModule, AgGridAngular, CommonModule],
  providers: [WebService],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css',
})
export class LogsComponent {
  /**
   * Used to store the current execution context (whether it is SSR or CSR).
   */
  isBrowser = false;

  /**
   * Definition of AG Grid column headings.
   */
  headings: ColDef[] = [
    { field: 'action', width: 800 },
    { field: 'time', width: 300 },
    { field: 'user', width: 150, filter: true, floatingFilter: true },
  ];

  /**
   * Used to store the data to be passed into the AG Grid.
   */
  data: any = [];

  /**
   * Indicates the current state of pagination: enabled or disabled.
   */
  pagination = true;
  /**
   * Indicates the default page size (e.g 10).
   */
  paginationPageSize = 10;
  /**
   * Indicates the page size options (e.g 10, 25, or 50).
   */
  paginationPageSizeSelector = [10, 25, 50];

  /**
   * Constructor of the Logs component.
   * @param webService Injected Web Service.
   * @param platformId Injected Platform ID.
   */
  constructor(
    public webService: WebService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Initialisation method for the Logs component.
   */
  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.webService.getLogs().subscribe((response: any) => {
        this.data = response;
      });
    }
  }
}
