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

/**
 * The component used to enable the registration of new accounts.
 */
@Component({
  selector: 'register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  providers: [WebService],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  /**
   * Stores a boolean to determine if the password and confirm password fields match or not.
   */
  passwordMismatch = false;
  /**
   * The Form Group for creating new users.
   */
  newUserForm: FormGroup = new FormGroup({});

  /**
   * The constructor for the Register component.
   * @param webService Injected WebService.
   * @param formBuilder Injected Form Builder.
   * @param router Injected Router.
   */
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

  /**
   * Checks if a form field is invalid.
   * @param control The name of the form field.
   * @returns A boolean based on the validity of the form field.
   */
  isInvalid(control: string) {
    return (
      this.newUserForm.controls[control].invalid &&
      this.newUserForm.controls[control].touched
    );
  }

  /**
   * Checks if a form field has interacted with.
   * @returns A boolean based on if the field has been interacted with.
   */
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

  /**
   * Checks if the form is incomplete.
   * @returns A boolean based on if the form is incomplete.
   */
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

  /**
   * Binds data from the Form Group object to to a Form Data object. If passwords match then the Web Service is called, if not, the method will return early. If successful, the user is redirected to the login screen.
   * @returns Will exit early if the passwords do not match.
   */
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
