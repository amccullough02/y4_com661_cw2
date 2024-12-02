import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'starsystem',
  standalone: true,
  imports: [CommonModule, RouterModule, DecimalPipe],
  providers: [WebService],
  templateUrl: './starsystem.component.html',
  styleUrl: './starsystem.component.css',
})
export class StarsystemComponent {
  star_data: any;
  planets: any;

  constructor(public webService: WebService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.webService
      .getStar(this.route.snapshot.paramMap.get('id'))
      .subscribe((response: any) => {
        this.star_data = response;
        this.planets = response.planets;
      });
  }
}
