import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { AuthService, IState } from './auth.service';
import { User } from '../meds/medTypes';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgStyle],

  template: `
    <div class="background-container">
      <div class="content">
        <form class="example-form" [formGroup]="form" (submit)="onSubmit()">
          <p style="color:black">Sign-In</p>
          <!-- <img src="assets/images/frame.png" [ngStyle]="{'width':'100%','height':'100%'}"/> -->
          <mat-form-field class="example-full-width">
            <mat-label>Email</mat-label>
            <input
              type="email"
              matInput
              formControlName="email"
              placeholder="Ex.pat@example.com"
            />

            @if (form.hasError('email') && !form.hasError('required')) {
            <mat-error>Please enter a valid email address</mat-error>
            } @if (form.hasError('required')) {
            <mat-error>Email is <strong>required</strong></mat-error>
            }
          </mat-form-field>

          <br />

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
      </div>
    </div>
  `,
  styleUrl: `./signincomponent.css`,
})
export class SigninComponent {
  readonly #auth = inject(AuthService);
  readonly #router = inject(Router);
  #notification = inject(ToastrService);

  form = inject(FormBuilder).group({
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    this.#auth.signin(this.form.value as User).subscribe({
      next: (response) => {
        if (response.success) {
          const decoded_token = jwtDecode(response.data) as IState;
          this.#auth.state$.set({
            _id: decoded_token._id,
            fullname: decoded_token.fullname,
            email: decoded_token.email,
            jwt: response.data,
          });
          this.#router.navigate(['', 'medications', 'list']);
        }
      },
      error: (error) => {
        this.#notification.error(`Invalid Username or Password`);
      },
    });
  }
}
