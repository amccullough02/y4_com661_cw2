import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebService } from '../web.service';
import { Router } from '@angular/router';

@Component({
  selector: 'logout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  providers: [WebService],
  templateUrl: './logout.component.html',
})
export class LogoutComponent {
  constructor(private webService: WebService, private router: Router) {}

  ngOnInit() {
    this.webService.logout().subscribe((response: any) => {
      console.log(response);
    });
    localStorage.removeItem('x-access-token');
    this.router.navigateByUrl('/');
  }
}
