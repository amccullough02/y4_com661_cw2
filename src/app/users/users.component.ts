import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * A component used to provide user management for admins.
 */
@Component({
  selector: 'users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [WebService],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  /**
   * The list of accounts.
   */
  user_list: any;

  /**
   * The constructor for the Users component.
   * @param webService Injected Web Service.
   */
  constructor(public webService: WebService) {}

  /**
   * Initialisation method for the Users component.
   */
  ngOnInit() {
    this.webService.getUsers().subscribe((response: any) => {
      this.user_list = response;
      console.log(response);
    });
  }
}
