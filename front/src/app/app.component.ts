import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService, initalState } from './auth/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgStyle } from '@angular/common';
import { MedService } from './meds/med.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    NgStyle,
    NgClass,
  ],
  template: `
    <div class="header">
      <h1>Welcome {{ auth.state$().fullname }}!</h1>
      &nbsp;
      <h3>search</h3>
      &nbsp;
      <h6>A-Z</h6>
    </div>

    @if(auth.is_logged_in()){
    <nav class="navbar">
      <ul class="navbar-left">
        <li>
          <a [routerLink]="['', 'medications', 'list']">
            <mat-icon
              aria-hidden="false"
              aria-label="Example home icon"
              fontIcon="home"
            ></mat-icon>
          </a>
        </li>
      </ul>
      <ul class="navbar-right">
        <li><a [routerLink]="['', 'medications', 'add']">Add New Med</a></li>
        <li><a (click)="logout()">Logout </a></li>
      </ul>
    </nav>
    }@else {
    <nav class="navbar">
      <ul class="navbar-left">
        <li><a [routerLink]="['signup']">Signup</a></li>
        <li><a [routerLink]="['signin']">Signin</a></li>
      </ul>
      <ul class="navbar-right">
        <li><a [routerLink]="['', 'medications', 'list']">Medications</a></li>
      </ul>
    </nav>

    }
    <router-outlet />
 
    
  `,
  styles: [
    `
      .header {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      * {
        margin: 0;
        padding: 0;
      }
      .navbar {
        display: flex;
        justify-content: space-between;
        background-color: #333;
        padding: 10px 20px;
      }
      .navbar-left,
      .navbar-right {
        list-style-type: none;
        display: flex;
        align-items: center;
      }
    .navbar-left li,
      .navbar-right li {
        margin-right: 10px;
      }
     .navbar-left li a,
      .navbar-right li a {
        color: #fff;
        text-decoration: none;
        padding: 10px 15px;
        border-radius: 5px;
        transition: background-color 0.3s ease;
      }
    .navbar-left li a:hover,
      .navbar-right li a:hover {
        background-color: #555;
      }
    `,
  ],
})
export class AppComponent {
  readonly auth = inject(AuthService);
  readonly #router = inject(Router);
 
  logout() {
    this.auth.state$.set(initalState);
    this.#router.navigate(['signin']);
  }
}
