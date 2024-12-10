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

  testGetStars() {
    this.webService.getStars(1).subscribe((response: any) => {
      if (Array.isArray(response) && response.length == 12)
        this.test_output.push('Page of Stars fetched... PASS');
      else this.test_output.push('Page of Stars fetched... FAIL');
    });
  }

  ngOnInit() {
    this.testGetStars();
  }
}
