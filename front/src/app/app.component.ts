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
    <div class="parent">
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

      <footer>
        <div class="text-center p-3">
          <div class="footer-container">
            <div class="footer-column">
              <h3>Reference</h3>
              <ul>
                <li>
                  <a
                    href="https://www.fda.gov/drugs/information-drug-class/homeopathic-products"
                    >Natural Products</a
                  >
                </li>
                <li>
                  <a href="https://www.fda.gov/drugs"
                    >Professional drug source</a
                  >
                </li>
                <li>
                  <a
                    href="https://www.fda.gov/drugs/information-consumers-and-patients-drugs/find-information-about-drug"
                    >Consumer drug source</a
                  >
                </li>
              </ul>
            </div>
            <div class="footer-column">
              <h3>Information</h3>
              <ul>
                <li>
                  <a
                    href="https://www.who.int/our-work/access-to-medicines-and-health-products/who-drug-information"
                    >International drug database</a
                  >
                </li>
                <li>
                  <a href="https://www.drugs.com/uk/">UK drug database</a>
                </li>
                <li>
                  <a
                    href="https://www.fda.gov/drugs/development-approval-process-drugs/drug-approvals-and-databases"
                    >US drug database</a
                  >
                </li>
              </ul>
            </div>
            <div class="footer-column">
              <h3>Support</h3>
              <ul>
                <li>
                  <a
                    href="https://americanaddictioncenters.org/online-resources"
                    >Help Center</a
                  >
                </li>
                <li>
                  <a
                    href="https://www.drugs.com/fda-consumer/your-guide-to-reporting-problems-to-fda-71.html"
                    >Report side effects</a
                  >
                </li>
                <li>
                  <a href="https://www.who.int/about/ethics/integrity-hotline"
                    >Report misconduct</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <p [ngStyle]="{ 'margin-left': '20px' }">
            © 2005 - 2024 WebMD LLC, an Internet Brands company. All rights
            reserved. WebMD does not provide medical advice, diagnosis or
            treatment. See additional information.
          </p>
        </div>
      </footer>
    </div>
  `,
  styles: [
    `
      footer {
        background-color: #333;
        color: #fff;
        padding: 20px;
      }

      .footer-container {
        display: flex;
        justify-content: center;

        margin: 0 auto;
        margin-left: 250px;
      }

      .footer-column {
        flex: 1;
        margin: 0 10px;
      }

      .footer-column h3 {
        padding-bottom: 10px;
        margin-bottom: 10px;
      }

      .footer-column ul {
        list-style: none;
        padding: 0;
      }

      .footer-column ul li {
        margin-bottom: 10px;
      }

      .footer-column ul li a {
        color: #fff;
        text-decoration: none;
      }

      .footer-column ul li a:hover {
        text-decoration: underline;
      }
      .parent {
        background-color: #ffe6e6;
      }
      .header {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffe6e6;
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
