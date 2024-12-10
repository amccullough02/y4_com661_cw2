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

/**
 * A component containing logic that enables the creation of new planets.
 */
@Component({
  selector: 'new_planet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [WebService],
  templateUrl: './newplanet.component.html',
  styleUrl: './newplanet.component.css',
})
export class NewPlanet {
  /**
   * The name of the star for the new planet to be associated with, used for the page heading.
   */
  star_name: string = '';
  /**
   * The id of the star for the new planet to be associated with.
   */
  star_id: string = '';
  /**
   * The Form Group used for creating new planets.
   */
  newPlanetForm: FormGroup = new FormGroup({});

  /**
   * The constructor for the New Planet component.
   * @param webService Injected Web Service.
   * @param route Injected Activated Route.
   * @param formbuilder Injected Form Builder.
   * @param router Injected Router.
   */
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

  /**
   * The initialisation method for the New Planet component.
   */
  ngOnInit() {
    this.webService
      .getStar(this.route.snapshot.paramMap.get('id'))
      .subscribe((response: any) => {
        this.star_name = response.name;
        this.star_id = response._id;
      });
  }

  /**
   * Checks if a form field is invalid.
   * @param control The name of the form field.
   * @returns A boolean based on the validity of the form field.
   */
  isInvalid(control: string) {
    return (
      this.newPlanetForm.controls[control].invalid &&
      this.newPlanetForm.controls[control].touched
    );
  }

  /**
   * Checks if a form field has interacted with.
   * @returns A boolean based on if the field has been interacted with.
   */
  isUntouched() {
    return (
      this.newPlanetForm.controls['name'].pristine ||
      this.newPlanetForm.controls['status'].pristine
    );
  }

  /**
   * Checks if the form is incomplete.
   * @returns A boolean based on if the form is incomplete.
   */
  isIncomplete() {
    return (
      this.isInvalid('name') || this.isInvalid('status') || this.isUntouched()
    );
  }

  /**
   * Binds data from the Form Group to a Form Data object. The Web Service is then called to add the planet.
   */
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
