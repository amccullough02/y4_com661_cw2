import { Component } from '@angular/core';
import { WebService } from '../web.service';

@Component({
  selector: 'test',
  standalone: true,
  providers: [WebService],
  templateUrl: './test.component.html',
})
export class TestComponent {
  test_output: string[] = [];
  new_planet_id = '';
  test_star = '6748544196eb734789dfae27'; // Random star from database to use for testing.

  constructor(private webService: WebService) {}

  // LOGIN AND LOGOUT
  login() {
    this.webService
      .login('stargal21', 'iamgamora')
      .subscribe((response: any) => {
        localStorage.setItem('x-access-token', response.token);
      });
  }

  // STARS AND PLANETS

  testGetStars() {
    this.webService.getStars(1).subscribe((response: any) => {
      if (Array.isArray(response) && response.length == 12)
        this.test_output.push('Get paginated list of stars... PASS');
      else this.test_output.push('Get paginated list of stars... FAIL');
    });
  }

  testGetStar() {
    this.webService
      .getStar(this.test_star)
      .subscribe((response: any) => {
        if ((response.name = 'HIP 43077'))
          this.test_output.push('Get a star... PASS');
        else this.test_output.push('Get a star... FAIL');
      });
  }

  testGetNumStars() {
    this.webService.getNumOfStars().subscribe((response: any) => {
      if (typeof response === 'number')
        this.test_output.push('Get number of stars... PASS');
      else this.test_output.push('Get number of stars... FAIL');
    });
  }

  testGetPlanet() {
    this.webService
      .getPlanet(this.test_star, '6748544096eb734789dfa9be')
      .subscribe((response: any) => {
        if (response.name === 'HIP 20656 b') {
          this.test_output.push('Get a planet... PASS');
        } else {
          this.test_output.push('Get a planet... FAIL');
        }
      });
  }

  testCreatePlanet() {
    let planet_id = '';
    const formData = new FormData();
    formData.append('name', 'Earth');
    formData.append('mass', '3');
    formData.append('radius', '6371');
    formData.append('density', '5.51');
    formData.append('surface_temperature', '288');
    formData.append('apoapsis', '150000000');
    formData.append('periapsis', '150000000');
    formData.append('eccentricity', '0.0167');
    formData.append('orbital_period', '365');
    formData.append('status', 'Active');
    formData.append('num_moons', '1');

    this.webService
      .createPlanet(this.test_star, formData)
      .subscribe((response: any) => {
        planet_id = response.url.match(/\/planets\/([^/]+)/)[1];
        this.new_planet_id = planet_id;
        if (
          response.url &&
          response.url.startsWith(
            'http://127.0.0.1:5000/api/v1.0/bodies/6748544196eb734789dfae27/planets/'
          )
        )
          this.test_output.push('Create a new planet... PASS');
        else this.test_output.push('Create a new planet... FAIL');

        this.testEditPlanet(this.new_planet_id);
      });
  }

  testEditPlanet(new_planet_id: string) {
    const formData = new FormData();
    formData.append('name', 'New Earth');
    formData.append('mass', '3');
    formData.append('radius', '6371');
    formData.append('density', '5.51');
    formData.append('surface_temperature', '288');
    formData.append('apoapsis', '150000000');
    formData.append('periapsis', '150000000');
    formData.append('eccentricity', '0.0167');
    formData.append('orbital_period', '365');
    formData.append('status', 'Active');
    formData.append('num_moons', '1');

    this.webService
      .editPlanet(this.test_star, new_planet_id, formData)
      .subscribe((response: any) => {
        if (
          response.url &&
          response.url.startsWith(
            'http://127.0.0.1:5000/api/v1.0/bodies/6748544196eb734789dfae27/planets/'
          )
        )
          this.test_output.push('Edit a planet... PASS');
        else this.test_output.push('Edit a planet... FAIL');

        this.testDeletePlanet(this.new_planet_id);
      });
  }

  testDeletePlanet(new_planet_id: string) {
    this.webService
      .deletePlanet(this.test_star, new_planet_id)
      .subscribe((response: any) => {
        if (response.message === 'planet deleted successfully')
          this.test_output.push('Delete a planet... PASS');
        else this.test_output.push('Delete a planet... FAIL');
      });
  }

  testGetLogs() {
    this.webService.getLogs().subscribe((response: any) => {
      if (Array.isArray(response))
        this.test_output.push('Get all logs... PASS');
      else this.test_output.push('Get all logs... FAIL');
    });
  }

  // USERS

  testGetUsers() {
    this.webService.getUsers().subscribe((response: any) => {
      if (Array.isArray(response))
        this.test_output.push('Get all users... PASS');
      else this.test_output.push('Get all users... FAIL');
    });
  }

  testRegister() {
    const formData = new FormData();
    formData.append('username', 'TestUsername');
    formData.append('forename', 'Testforename');
    formData.append('surname', 'Testsurname');
    formData.append('email', 'test@email.com');
    formData.append('password', 'averysecurepassword');

    this.webService.register(formData).subscribe((response: any) => {
      if (response.message === 'account registration successful')
        this.test_output.push('Register new user... PASS');
      else this.test_output.push('Register new user... FAIL');

      this.testGetUser();
    });
  }

  testGetUser() {
    this.webService.getUser('TestUsername').subscribe((response: any) => {
      if (response.username === 'TestUsername')
        this.test_output.push('Fetch a user... PASS');
      else this.test_output.push('Fetch a user... FAIL');

      this.testDeleteUser();
    });
  }

  testDeleteUser() {
    this.webService.deleteUser('TestUsername').subscribe((response: any) => {
      if (response.message === 'user deleted successfully')
        this.test_output.push('Delete a user... PASS');
      else this.test_output.push('Delete a user... FAIL');
    });
  }

  ngOnInit() {
    this.login();
    this.testGetStars();
    this.testGetStar();
    this.testGetNumStars();
    this.testGetPlanet();
    this.testCreatePlanet();
    this.testGetLogs();
    this.testGetUsers();
    this.testRegister();
  }
}
