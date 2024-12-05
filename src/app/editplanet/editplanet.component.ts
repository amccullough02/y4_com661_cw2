import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WebService } from '../web.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'edit_planet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [WebService],
  templateUrl: './editplanet.component.html',
})
export class EditPlanetComponent {
  planet_name: string = '';
  planet_id: any;
  star_id: any;
  editPlanetForm: FormGroup = new FormGroup({});

  constructor(
    public webService: WebService,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.planet_id = this.route.snapshot.paramMap.get('id');
    this.star_id = this.route.snapshot.queryParamMap.get('star_id');

    this.webService
      .getPlanet(this.star_id, this.planet_id)
      .subscribe((response: any) => {
        this.planet_name = response.name;
        this.editPlanetForm = this.formbuilder.group({
          name: response.name,
          mass: response.mass,
          radius: response.radius,
          density: response.density,
          surface_temperature: response.surface_temperature,
          apoapsis: response.apoapsis,
          periapsis: response.periapsis,
          eccentricity: response.eccentricity,
          orbital_period: response.orbital_period,
          status: response.status,
          num_moons: response.num_moons,
        });
      });
  }

  onSubmit() {}
}
