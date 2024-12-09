import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'starsystem',
  standalone: true,
  imports: [CommonModule, RouterModule, DecimalPipe],
  providers: [WebService, AuthService],
  templateUrl: './starsystem.component.html',
  styleUrl: './starsystem.component.css',
})
export class StarsystemComponent {
  star_name: string = '';
  planets: any;
  star_id: string = '';

  constructor(public webService: WebService, public authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.webService
      .getStar(this.route.snapshot.paramMap.get('id'))
      .subscribe((response: any) => {
        this.star_name = response.name;
        this.planets = response.planets;
        this.star_id = response._id;
      });
  }
}
