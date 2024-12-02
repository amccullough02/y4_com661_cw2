import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { WebService } from '../web.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'new_planet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [WebService],
  templateUrl: './newplanet.component.html',
})
export class NewPlanet {
  star_name: string = '';
  newPlanetForm: FormGroup = new FormGroup({});

  constructor(
    public webService: WebService,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.webService
      .getStar(this.route.snapshot.paramMap.get('id'))
      .subscribe((response: any) => {
        this.star_name = response.name;
      });

    this.newPlanetForm = this.formbuilder.group({
      name: [''],
      mass: 0,
      radius: 0,
      density: 0,
      surfaceTemperature: 0,
      apoapsis: 0,
      periapsis: 0,
      eccentricity: 0,
      orbitalPeriod: 0,
      status: [''],
      numOfMoons: 0,
      contributedBy: [''],
    });
  }

  onSubmit() {}
}
