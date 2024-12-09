import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WebService } from '../web.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'new_planet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [WebService],
  templateUrl: './newplanet.component.html',
})
export class NewPlanet {
  star_name: string = '';
  star_id: string = '';
  newPlanetForm: FormGroup = new FormGroup({});

  constructor(
    public webService: WebService,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
    private router: Router
  ) {
    this.newPlanetForm = this.formbuilder.group({
      name: [''],
      mass: 0,
      radius: 0,
      density: 0,
      surface_temperature: 0,
      apoapsis: 0,
      periapsis: 0,
      eccentricity: 0,
      orbital_period: 0,
      status: [''],
      num_moons: 0,
    });
  }

  ngOnInit() {
    this.webService
      .getStar(this.route.snapshot.paramMap.get('id'))
      .subscribe((response: any) => {
        this.star_name = response.name;
        this.star_id = response._id;
      });
  }

  onSubmit() {
    const formData = new FormData();
    Object.entries(this.newPlanetForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    this.webService
      .createPlanet(this.star_id, formData)
      .subscribe((response: any) => {
        this.newPlanetForm.reset();
        this.router.navigateByUrl('/stars/' + this.star_id);
      });
  }
}
