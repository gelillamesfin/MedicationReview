import { Component, inject, signal } from '@angular/core';
import { MedService } from './med.service';
import { RouterLink } from '@angular/router';
import { Medication } from './medTypes';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgStyle } from '@angular/common';
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
        <a [routerLink]="['', 'medications', med._id]" class="medslink">
          <li>{{ med.name }}</li></a>
      </div>
      }
      <div [ngStyle]="{'margin-top': '70px',  'margin-left': '30px',
          'padding': '50'}">
        <hr />
        <h2>Lates News</h2>
        <div class="newsCard">
          <mat-card class="example-card" >
            <mat-card-header>
              <mat-card-title-group>
                <img src="assets/images/Paxlovid.png" class="newsImage" />
              </mat-card-title-group>
            </mat-card-header>
            <mat-card-content>
              <h3>
                13 Things To Know About Paxlovid
              </h3>

              Paxlovid, an oral antiviral pill that can be taken at home, is the
              go-to treatment for COVID-19. If you are at high risk for severe
              disease from COVID, and you take it within the first five days of
              experiencing symptoms, it will lower your risk of getting so sick
              that you need to be hospitalized
              <a
                style="color:#FF4162"
                href="https://www.yalemedicine.org/news/13-things-to-know-paxlovid-covid-19"
                >Read More</a
              >
            </mat-card-content>
          </mat-card>
          <mat-card class="example-card" >
            <mat-card-header>
              <mat-card-title-group>
                <img src="assets/images/warning.png" class="newsImage" />
              </mat-card-title-group>
            </mat-card-header>

            <mat-card-content>
              <h3>How Smoking Affects Medications</h3>
              Smoking not only has the potential to cause death, but it also
              decreases the efficacy of many medications. For that reason, it’s
              important for pharmacists to know which medications are affected
              by smoking so that appropriate counseling measures and dosage
              adjustments can be provided to patients.
              <a
                style="color:#FF4162"
                href="https://www.pharmacytimes.com/view/how-smoking-affects-medications"
                >Learn More</a
              >
            </mat-card-content>
          </mat-card>
          <mat-card class="example-card">
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
                style="color:#FF4162"
                href="https://www.heart.org/en/around-the-aha/aha-names-top-advances-in-cardiovascular-disease-research-for-2023"
                >Read More
              </a>
            </mat-card-content>
          </mat-card>
          <mat-card class="example-card">
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
                style="color:#FF4162"
                href="https://www.heart.org/en/health-topics/consumer-healthcare/medication-information/medication-interactions-food-supplements-and-other-drugs"
                >Read More
              </a>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
      <hr />
      <div class="sign-up-banner">
        <div class="image-wrapper">
          <img src="assets/images/profile.png" />
        </div>
        <div [ngStyle]="{ 'margin-left': '100px' }">
          <h2>Create a free account</h2>
          <p>
            Sign up to review a drug and stay informed about new drug
            information. Join todat and stay upto date with the rapidly evolving
            pharmacetuical Industry
          </p>
          <div>
            <a
              [routerLink]="['signup']"
              [ngStyle]="{
                'border-radius': '24px',
                'background-color': 'pink',
                padding: '10px 30px',
                color: 'black'
              }"
            >
              Create Account
            </a>
          </div>
        </div>
      </div>
      <hr />
      <div class="doctorParagraph">
        <img src="assets/images/bloomdrink.png" style="width: 500px;" />
        <div style="margin-left: 50px;">
          <h3>Dietary Supplements: What You Need to Know</h3>
          <br />
          <p>
            Many adults and children in the United States take one or more
            vitamins or other dietary supplements. In addition to vitamins,
            dietary supplements can contain minerals, herbs or other botanicals,
            amino acids, enzymes, and many other ingredients. Dietary
            supplements come in a variety of forms, including tablets, capsules,
            gummies, and powders as well as drinks and energy bars. Popular
            supplements include vitamins D and B12; minerals like calcium and
            iron; herbs such as echinacea and garlic; and products like
            glucosamine, probiotics, and fish oils.Some dietary supplements can
            help you get adequate amounts of essential nutrients if you don’t
            eat a nutritious variety of foods. However, supplements can’t take
            the place of the variety of foods that are important to a healthy
            eating routine. To learn more about what makes a healthy eating
            routine, the Dietary Guidelines for Americansexternal link
            disclaimer and MyPlateexternal link disclaimer are good sources of
            information.
          </p>
        </div>

        <hr />
      </div>
      <div class="doctorParagraph">
        <div>
          <video controls width="500px" [autoplay]="true" [muted]="true">
            <source src="assets/images/medvideo2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div style="margin-left: 50px;">
          <h3>Medication safety : What You Need to Know</h3>
          <br />
          <p>
            Drugs are classified in multiple ways. One of the key divisions is
            by level of control, which distinguishes prescription drugs (those
            that a pharmacist dispenses only on the order of a physician,
            physician assistant, or qualified nurse) from over-the-counter drugs
            (those that consumers can order for themselves). Another key
            distinction is between traditional small-molecule drugs, usually
            derived from chemical synthesis, and biopharmaceuticals, which
            include recombinant proteins, vaccines, blood products used
            therapeutically (such as IVIG), gene therapy, monoclonal antibodies
            and cell therapy (for instance, stem-cell therapies). Other ways to
            classify medicines are by mode of action, route of administration,
            biological system affected, or therapeutic effects. An elaborate and
            widely used classification system is the Anatomical Therapeutic
            Chemical Classification System (ATC system). The World Health
            Organization keeps a list of essential medicines.
          </p>
        </div>
      </div>
      <div class="doctorParagraph">
        <div>
          <video controls width="500px" [autoplay]="true" [muted]="true">
            <source src="assets/images/who.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div style="margin-left: 50px;">
          <h3> Know your Medication: What You Need to Know</h3>
          <br />
          <p>
            Before leaving the pharmacy it’s important to have a clear
            understanding of a medication’s instructions. Patients should be
            counseled on every newly prescribed drug. Some pharmacies, like the
            ones at Long Beach Medical Center, offer direct phone lines for
            patients to contact a pharmacist if they ever have any questions,
            concerns or issues.
          </p>
          <p>
            <b> Tips for Taking Meds Be knowledgeable of what</b>
            <li>symptoms or conditions the medication is for.</li>
            <li>Understand the instructions for taking the medication.</li>
            <li>
              Know the side effects that can result from taking the medication.
            </li>
            <li>
              Keep in mind the strength of your prescription (i.e., 10 mg).
            </li>
            <li>Make sure the medicine is the same if it is a refill.</li>
            <li>
              Properly dispose of medications that are expired or that you no
              longer take.
            </li>
          </p>
        </div>
      </div>
    </div>
  `,
  styleUrl: './listComponent.css',
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
