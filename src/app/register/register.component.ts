import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { WebService } from '../web.service';
import {
  Validators,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  providers: [WebService],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  passwordMismatch = false;
  newUserForm: FormGroup = new FormGroup({});

  constructor(
    public webService: WebService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.newUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      forename: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
    });
  }

  isInvalid(control: string) {
    return (
      this.newUserForm.controls[control].invalid &&
      this.newUserForm.controls[control].touched
    );
  }

  isUntouched() {
    return (
      this.newUserForm.controls['username'].pristine ||
      this.newUserForm.controls['forename'].pristine ||
      this.newUserForm.controls['surname'].pristine ||
      this.newUserForm.controls['email'].pristine ||
      this.newUserForm.controls['password1'].pristine ||
      this.newUserForm.controls['password2'].pristine
    );
  }

  isIncomplete() {
    return (
      this.isInvalid('username') ||
      this.isInvalid('forename') ||
      this.isInvalid('surname') ||
      this.isInvalid('email') ||
      this.isInvalid('password1') ||
      this.isInvalid('password2') ||
      this.isUntouched()
    );
  }

  onRegister() {
    const formData = new FormData();

    if (
      this.newUserForm.get('password1')?.value !==
      this.newUserForm.get('password2')?.value
    ) {
      this.passwordMismatch = true;
      return;
    }

    this.passwordMismatch = false;

    formData.append('username', this.newUserForm.get('username')?.value);
    formData.append('forename', this.newUserForm.get('forename')?.value);
    formData.append('surname', this.newUserForm.get('surname')?.value);
    formData.append('email', this.newUserForm.get('email')?.value);
    formData.append('password', this.newUserForm.get('password1')?.value);

    this.webService.register(formData).subscribe((response: any) => {
      console.log(response);
      this.router.navigateByUrl('/login');
    });
  }
}
