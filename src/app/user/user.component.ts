import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

/**
 * A component used to manage a single user.
 */
@Component({
  selector: 'stars',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [WebService, AuthService],
  templateUrl: './user.component.html',
})
export class UserComponent {
  user: any;
  username: string = '';

  constructor(
    public webService: WebService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.webService
      .getUser(this.route.snapshot.paramMap.get('id'))
      .subscribe((response: any) => {
        this.user = response;
        this.username = response.username;
      });
  }

  get sameUser() {
    if (this.username === this.authService.getUsername()) {
      return true;
    }
    return false;
  }

  deleteUser() {
    this.webService
      .deleteUser(this.user.username)
      .subscribe((response: any) => {
        console.log(response);
      });
    this.router.navigateByUrl('/users');
  }
}
