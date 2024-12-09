import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../auth.service';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [RouterModule],
  providers: [AuthService],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  constructor(public authService: AuthService) {}
}
