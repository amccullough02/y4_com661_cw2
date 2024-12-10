import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

/**
 * A component used to provide user management for admins.
 */
@Component({
  selector: 'stars',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [WebService, AuthService],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  user_list: any;

  constructor(
    public webService: WebService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.webService.getUsers().subscribe((response: any) => {
      this.user_list = response;
      console.log(response);
    });
  }

  deleteUser() {}
}
