import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { AuthService } from '../auth.service';

/**
 * A component used to display a table of data regarding a star's planets.
 */
@Component({
  selector: 'starsystem',
  standalone: true,
  imports: [CommonModule, RouterModule, DecimalPipe],
  providers: [WebService, AuthService],
  templateUrl: './starsystem.component.html',
  styleUrl: './starsystem.component.css',
})
export class StarsystemComponent {
  /**
   * The name of the star, used for the page heading.
   */
  star_name: string = '';
  /**
   * The planets' data.
   */
  planets: any;
  /**
   * The id of the star.
   */
  star_id: string = '';

  /**
   * The constructor used for the Star System component.
   * @param webService Injected Web Service.
   * @param authService Injected Auth Service.
   * @param route Injected Activated Route.
   */
  constructor(public webService: WebService, public authService: AuthService, private route: ActivatedRoute) {}

  /**
   * The initialisation method for the Star System component.
   */
  ngOnInit() {
    this.webService
      .getStar(this.route.snapshot.paramMap.get('id'))
      .subscribe((response: any) => {
        this.star_name = response.name;
        this.planets = response.planets;
        this.star_id = response._id;
      });
  }
}
