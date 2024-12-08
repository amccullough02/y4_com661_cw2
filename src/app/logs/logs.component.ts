import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WebService } from '../web.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'logs',
  standalone: true,
  imports: [RouterModule, AgGridAngular, CommonModule],
  providers: [WebService],
  templateUrl: './logs.component.html',
})
export class LogsComponent {
  isBrowser = false;

  headings: ColDef[] = [
    { field: 'action', width: 740 },
    { field: 'time', width: 200 },
    { field: 'user', width: 150, filter: true, floatingFilter: true },
  ];

  data: any = [];

  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [10, 25, 50];

  constructor(
    public webService: WebService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.webService.getLogs().subscribe((response: any) => {
        this.data = response;
      });
    }
  }
}
