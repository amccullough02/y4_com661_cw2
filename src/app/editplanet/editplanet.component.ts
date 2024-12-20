import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WebService } from '../web.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * A component containing logic that enables the modification of planet data.
 */
@Component({
  selector: 'edit_planet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [WebService],
  templateUrl: './editplanet.component.html',
})
export class EditPlanetComponent {
  /**
   * The name of the planet being modified.
   */
  planet_name: string = '';
  /**
   * The id of the planet being modified.
   */
  planet_id: any;
  /**
   * The id of the star associated with this planet.
   */
  star_id: any;
  /**
   * The formgroup used for modifying planets.
   */
  editPlanetForm: FormGroup = new FormGroup({});

  /**
   * The Edit Planet constructor.
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
    this.editPlanetForm = this.formbuilder.group({
      name: [''],
      mass: [''],
      radius: [''],
      density: [''],
      surface_temperature: [''],
      apoapsis: [''],
      periapsis: [''],
      eccentricity: [''],
      orbital_period: [''],
      status: [''],
      num_moons: [''],
    });
  }

  /**
   * Initialisation method for the Edit Planet component.
   */
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

  /**
   * Binds data from the Form Group to a Form Data object. This object is then passed to the Web Service.
   */
  onSubmit() {
    const formData = new FormData();
    Object.entries(this.editPlanetForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    this.webService
      .editPlanet(this.star_id, this.planet_id, formData)
      .subscribe((response: any) => {
        console.log(response);
        this.editPlanetForm.reset();
        const url = ['/planets', this.planet_id];
        this.router.navigate(url, { queryParams: { star_id: this.star_id } });
      });
  }
}
