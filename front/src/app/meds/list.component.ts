import {
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { MedService } from './med.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Medication } from './medTypes';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatGridListModule,
    RouterLink,
    NgStyle,
    MatCardModule,
    MatButtonModule,
  ],
  template: `
    <div class="container">
      <div class="letters">
        <button (click)="getMedsForLetter('A')">A</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('B')">B</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('C')">C</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('D')">D</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('E')">E</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('F')">F</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('G')">G</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('H')">H</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('I')">I</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('J')">J</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('K')">K</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('L')">L</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('M')">M</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('N')">N</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('O')">O</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('P')">P</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('Q')">Q</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('R')">R</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('S')">S</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('T')">T</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('U')">U</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('V')">V</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('W')">W</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('X')">X</button>&nbsp;&nbsp;
        <button (click)="getMedsForLetter('Z')">Z</button>&nbsp;&nbsp;
      </div>
      <h2 [ngStyle]="{ 'margin-left': '30px' }">Most Common Drugs</h2>
      @for(med of $meds(); track med._id){
      <div class="meds">
        <a [routerLink]="['', 'medications', med._id]"> {{ med.name }}</a>
      </div>
      }
      <div [style]="{ 'margin-top': '70px', 'margin-left': '30px','padding':'500' }">
        <h2>Lates News</h2>
        <div class="newsCard">
          <mat-card class="example-card" appearance="outlined">
            <mat-card-header>
              <mat-card-title-group>
                <img src="assets/images/Paxlovid.png" class="newsImage" />
              </mat-card-title-group>
            </mat-card-header>
            <mat-card-content>
              <h3>
                13 Things To Know About Paxlovid, the Latest COVID-19 Pill
              </h3>

              Paxlovid, an oral antiviral pill that can be taken at home, is the
              go-to treatment for COVID-19. If you are at high risk for severe
              disease from COVID, and you take it within the first five days of
              experiencing symptoms, it will lower your risk of getting so sick
              that you need to be hospitalized
              <a
                href="https://www.yalemedicine.org/news/13-things-to-know-paxlovid-covid-19"
                >Read More</a
              >
            </mat-card-content>
          </mat-card>
          <mat-card class="example-card" appearance="outlined">
            <mat-card-header>
              <mat-card-title-group>
                <img src="assets/images/Cardiology.png" class="newsImage" />
              </mat-card-title-group>
            </mat-card-header>
            <mat-card-content>
              <h3>Top Advance in Cardiovascular Disease Research</h3>
              Hypertension affects nearly half of all U.S. adults, many of whom
              don’t even know they have it. Left untreated, it greatly increases
              the risk for having a heart attack, stroke and other serious
              health problems. It also can cut life expectancy by up to five
              years.
              <a
                href="https://www.heart.org/en/around-the-aha/aha-names-top-advances-in-cardiovascular-disease-research-for-2023"
                >Read More
              </a>
            </mat-card-content>
          </mat-card>
          <mat-card class="example-card" appearance="outlined">
            <mat-card-header>
              <mat-card-title-group>
                <img
                  src="assets/images/boostyourimmune.png"
                  class="newsImage"
                />
              </mat-card-title-group>
            </mat-card-header>
            <mat-card-content>
              <h3>
                Medication Interactions: Food, Supplements and Other Drugs
              </h3>
              Healthy eating is critical for people battling heart disease. In
              fact, it can help reverse a condition or reduce the need for
              medication. But even healthy foods, including fruits and
              vegetables, can cause unintended and possibly dangerous
              interactions with certain medications.
              <a
                href="https://www.heart.org/en/health-topics/consumer-healthcare/medication-information/medication-interactions-food-supplements-and-other-drugs"
                >Read More
              </a>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
      
      <mat-card>
        <mat-card-header>
          <mat-card-title-group>
            <mat-card-title><b>Medication Without Harm</b></mat-card-title>
          </mat-card-title-group>
        </mat-card-header>
        <mat-card-content>
          Unsafe medication practices and medication errors are a leading cause
          of injury and avoidable harm in health care systems across the world.
          Globally, the cost associated with medication errors has been
          estimated at $42 billion USD annually. Errors can occur at different
          stages of the medication use process. Medication errors occur when
          weak medication systems and/or human factors such as fatigue, poor
          environmental conditions or staff shortages affect prescribing,
          transcribing, dispensing, administration and monitoring practices,
          which can then result in severe harm, disability and even death.
          Multiple interventions to address the frequency and impact of
          medication errors have already been developed, yet their
          implementation is varied. A wide mobilization of stakeholders
          supporting sustained actions is required.
        </mat-card-content>
      </mat-card>

      <video controls width="100%" height="350">
        <source src="assets/images/who.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <footer class="footer">hi</footer>
  `,
  styles: `

  .container{
    min-height:100%;
    background-color:pink;
  }
.footer{
  background-color:black;
  position:relative;
  height:100px;
  margin-top:-100px
  // clear:both;
}
  .newsCard{
  display:flex;
//  margin-top:70px;
  // margin-left:0px;
  justify-content:space-between;
  padding:10px
}
.newsImage{
  display:flex;
width:350px;
height:200px;
align-items:center


}

.example-card {
  max-width: 400px;
}

.example-header-image {
  // background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');
  background-size: cover;
}

  .meds{
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    // justify-content:center;
    margin-top:2px;
    margin-left:30px;
    
  }
  .letters{
    display:flex;
     flex-wrap:wrap;
     align-items:center;
    justify-content:center;
     margin-top:2px;
     padding:20px
    },

  
  `,
})
export class ListComponent {
  readonly medService = inject(MedService);

  $meds = signal<Medication[]>([]);

  constructor() {
    this.medService.getMeds$().subscribe((response) => {
      this.$meds.set(response.data);
    });
  }
  getMedsForLetter(letter: string) {
    this.medService.getMeds$(letter).subscribe((response) => {
      this.$meds.set(response.data);
    });
  }
}
