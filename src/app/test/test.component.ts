import { Component } from '@angular/core';
import { WebService } from '../web.service';

@Component({
  selector: 'testWS',
  standalone: true,
  providers: [WebService],
  templateUrl: './test.component.html',
})
export class TestComponent {
  test_output: string[] = [];
  constructor(private webService: WebService) {}

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
      .getStar('67253517c5cdf6233de8bb86')
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
      .getPlanet('67253517c5cdf6233de8bb86', '67253517c5cdf6233de8b6dd')
      .subscribe((response: any) => {
        if (response.name === 'HIP 43077 b') {
          this.test_output.push('Get a planet... PASS');
        } else {
          this.test_output.push('Get a planet... FAIL');
        }
      });
  }

  ngOnInit() {
    this.testGetStars();
    this.testGetStar();
    this.testGetNumStars();
    this.testGetPlanet();
  }
}
