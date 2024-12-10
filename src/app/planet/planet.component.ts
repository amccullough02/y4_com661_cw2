import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WebService } from '../web.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

/**
 * The component used to display individual planet data.
 */
@Component({
  selector: 'planet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [WebService, AuthService],
  templateUrl: './planet.component.html',
})
export class PlanetComponent {
  /**
   * The id of the planet being displayed.
   */
  planet_id: any;
  /**
   * The id of the associated star.
   */
  star_id: any;
  /**
   * Contains data about the planet.
   */
  planet: any;

  /**
   * The constructor for the Planet component.
   * @param webService Injected Web Service.
   * @param authService Injected Auth Service.
   * @param route Injected Activated Router.
   * @param router Injected Router.
   */
  constructor(
    public webService: WebService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * The initialisation method for the Planet component.
   */
  ngOnInit() {
    this.planet_id = this.route.snapshot.paramMap.get('id');
    this.star_id = this.route.snapshot.queryParamMap.get('star_id');

    this.webService
      .getPlanet(this.star_id, this.planet_id)
      .subscribe((response: any) => {
        this.planet = response;
      });
  }

  /**
   * Checks if the currently authenticated user matches the username of the planet's contributor.
   * @returns A boolean of true if the names match, otherwise false.
   */
  get checkUsername() {
    const current_user = this.authService.getUsername();
    if (this.planet.contributed_by === current_user) {
      return true;
    }
    return false;
  }

  /**
   * Deletes a planet by calling the Web Service. If successful, a redirect to the system page occurs.
   */
  onDelete() {
    this.webService
      .deletePlanet(this.star_id, this.planet_id)
      .subscribe((response: any) => {});
    this.router.navigateByUrl('/stars/' + this.star_id);
  }
}
