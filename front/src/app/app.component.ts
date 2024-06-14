import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService, initalState } from './auth/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  template: `
    <h1>Welcome {{ auth.state$().fullname }}!</h1>
    @if(auth.is_logged_in()){
    <nav>
      <ul>
        <li>
          <a [routerLink]="['', 'medications', 'list']">
            <mat-icon aria-hidden="false"aria-label="Example home icon"fontIcon="home"></mat-icon>
          </a>
        </li>
        <li><a [routerLink]="['', 'medications', 'add']">Add New Med</a></li>
        <!-- <li><a [routerLink]="['', 'medications', '_id','list']">Reviews</a></li> -->
        <!-- <li><a [routerLink]="['', 'medications', 'reviews','add']">Add New Review</a></li> -->

        <li><a [routerLink]="['', 'profile']">Profile</a></li>

        <li><a (click)="logout()">Logout </a></li>
      </ul>
    </nav>
    }@else {
    <nav>
      <ul>
        <li><a [routerLink]="['signup']">Signup</a></li>
        <li><a [routerLink]="['signin']">Signin</a></li>
        <li><a [routerLink]="['', 'medications', 'list']">Medications</a></li>
      </ul>
    </nav>

    }
    <router-outlet />
  `,
  styles: [
    `
      nav > ul > li {
        display: inline;
        padding-right: 20px;
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
