import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WebService } from '../web.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'planet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [WebService, AuthService],
  templateUrl: './planet.component.html',
})
export class PlanetComponent {
  planet_id: any;
  star_id: any;
  planet: any;

  constructor(
    public webService: WebService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.planet_id = this.route.snapshot.paramMap.get('id');
    this.star_id = this.route.snapshot.queryParamMap.get('star_id');

    this.webService
      .getPlanet(this.star_id, this.planet_id)
      .subscribe((response: any) => {
        this.planet = response;
      });
  }

  onDelete() {
    this.webService
      .deletePlanet(this.star_id, this.planet_id)
      .subscribe((response: any) => {
      });
    this.router.navigateByUrl('/stars/' + this.star_id);
  }
}
