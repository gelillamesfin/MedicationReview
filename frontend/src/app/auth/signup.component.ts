import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  
  Validators,
  
  FormBuilder,
} from '@angular/forms';
import { AuthService } from './auth.service';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MyErrorStateMatcher } from './signupError';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../types';
//  import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
 




@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgStyle],
  template: `
    <form class="example-form" [formGroup]="form" (submit)="onSubmit()">
      <p>Sign-up</p>
      <mat-form-field class="example-full-width">
        <mat-label>Email</mat-label>
        <input
          type="email"
          matInput
          formControlName="email"
          [errorStateMatcher]="matcher"
          placeholder="Ex.pat@example.com"
        />
        <mat-hint>Enter a valid email</mat-hint>
        @if (form.hasError('email') && !form.hasError('required')) {
        <mat-error>Please enter a valid email address</mat-error>
        } @if (form.hasError('required')) {
        <mat-error>Email is <strong>required</strong></mat-error>
        }
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>Full Name</mat-label>
        <input matInput formControlName="fullname" /> </mat-form-field
      ><br />
    
      <mat-form-field class="example-full-width">
        <mat-label>Password</mat-label>
        <input
          type="password"
          matInput
          formControlName="password"
          placeholder="password"
        />
      </mat-form-field>
      <button mat-raised-button type="submit" [disabled]="form.invalid">
        Submit
      </button>
    </form>
  `,
  styles: `
  
  .example-form {
  min-width: 150px;
  max-width: 350px;
  width: 100%;
  margin-Left:40%;
 

}

.example-full-width {
  width: 100%;
 
 //work on centering the input fields 

}

.form{
  display:flex;

}

  
  `,
})
export class SignupComponent {
  readonly #auth = inject(AuthService);
  readonly #router = inject(Router);
  form = inject(FormBuilder).group({
    fullname: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  matcher = new MyErrorStateMatcher();

  onSubmit() {
    this.#auth.signup(this.form.value as User).subscribe((response) => {
      if (response.success) {
        this.#router.navigate(['signin']);
      }
    });
  }
}
