import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebService } from '../web.service';
import { Router } from '@angular/router';

/**
 * A component containing logic that enables user logout.
 */
@Component({
  selector: 'logout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  providers: [WebService],
  templateUrl: './logout.component.html',
})
export class LogoutComponent {
  /**
   * The Login component constructor.
   * @param webService Injected Web Service.
   * @param router Injected Router.
   */
  constructor(private webService: WebService, private router: Router) {}

  /**
   * Initialisation method for the Logout component.
   */
  ngOnInit() {
    this.webService.logout().subscribe((response: any) => {
      console.log(response);
    });
    localStorage.removeItem('x-access-token');
    this.router.navigateByUrl('/');
  }
}
