import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WebService } from '../web.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'new_planet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [WebService],
  templateUrl: './newplanet.component.html',
  styleUrl: './newplanet.component.css',
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
      name: ['', Validators.required],
      mass: 0,
      radius: 0,
      density: 0,
      surface_temperature: 0,
      apoapsis: 0,
      periapsis: 0,
      eccentricity: 0,
      orbital_period: 0,
      status: ['', Validators.required],
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

  isInvalid(control: string) {
    return (
      this.newPlanetForm.controls[control].invalid &&
      this.newPlanetForm.controls[control].touched
    );
  }

  isUntouched() {
    return (
      this.newPlanetForm.controls['name'].pristine ||
      this.newPlanetForm.controls['status'].pristine
    );
  }

  isIncomplete() {
    return (
      this.isInvalid('name') || this.isInvalid('status') || this.isUntouched()
    );
  }

  onSubmit() {
    const formData = new FormData();
    Object.entries(this.newPlanetForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    this.webService
      .createPlanet(this.star_id, formData)
      .subscribe((response: any) => {
        console.log(response)
        this.newPlanetForm.reset();
        this.router.navigateByUrl('/stars/' + this.star_id);
      });
  }
}
