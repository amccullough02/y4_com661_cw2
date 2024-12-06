import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WebService } from '../web.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'planet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [WebService],
  templateUrl: './planet.component.html',
})
export class PlanetComponent {
  planet_id: any;
  star_id: any;
  planet: any;

  constructor(
    public webService: WebService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.planet_id = this.route.snapshot.paramMap.get('id');
    this.star_id = this.route.snapshot.queryParamMap.get('star_id');
    console.log(this.planet_id);

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
        console.log(response);
      });
    this.router.navigateByUrl('/stars/' + this.star_id);
  }
}
