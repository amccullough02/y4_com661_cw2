import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

/**
 * A component used to manage a single user.
 */
@Component({
  selector: 'user',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [WebService, AuthService],
  templateUrl: './user.component.html',
})
export class UserComponent {
  /**
   * Data about the user.
   */
  user: any;
  /**
   * The username of the user.
   */
  username: string = '';

  /**
   * The constructor for the User component.
   * @param webService Injected Web Service.
   * @param authService Injected Auth Service.
   * @param route Injected Activated Route.
   * @param router Injected Router.
   */
  constructor(
    public webService: WebService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Initialisation method for the User component.
   */
  ngOnInit() {
    this.webService
      .getUser(this.route.snapshot.paramMap.get('id'))
      .subscribe((response: any) => {
        this.user = response;
        this.username = response.username;
      });
  }

  /**
   * Checks if the user being viewed is the same as the authenticated user. If true, the delete account button is hidden.
   */
  get sameUser() {
    if (this.username === this.authService.getUsername()) {
      return true;
    }
    return false;
  }

  /**
   * Calls the Web Service to delete the user.
   */
  deleteUser() {
    this.webService
      .deleteUser(this.user.username)
      .subscribe((response: any) => {
        console.log(response);
      });
    this.router.navigateByUrl('/users');
  }
}
