import { Component, effect, inject, input } from '@angular/core';
import { MedService } from './med.service';
import { Med } from './medTypes';
import { MatCardModule } from '@angular/material/card';
import { NgClass, NgStyle } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-med',
  standalone: true,
  imports: [MatCardModule, NgStyle, MatIconModule, NgClass],
  template: `
    <div class="card-container">
      <mat-card class="example-card">
        <mat-card-header>
          <!-- <button mat-icon-button class="dots">
            <mat-icon>more_vert</mat-icon>
          </button> -->

          <mat-card-title-group>
            <mat-card-title>{{ med.name }}</mat-card-title>
            <mat-card-subtitle>{{ med.generic_name }}</mat-card-subtitle>
            <!-- <img
              mat-card-sm-image
              src="https://material.angular.io/assets/img/examples/shiba2.jpg"
            /> -->
            <img
              width="100"
              src="http://localhost:3000/medications/images/{{
                med.image
              }}"
            />
          </mat-card-title-group>
        </mat-card-header>
        <mat-card-content>
          <span [ngStyle]="{ 'font-weight': 'bold' }"> Availability: </span
          >{{ med.availability }}<br />
          <span [ngStyle]="{ 'font-weight': 'bold' }">Medication Class: </span>
          {{ med.medication_class }}
          <p></p>
          @if(auth.is_logged_in()){
          <div>
            <button mat-button color="primary" (click)="onReview(med._id)">
              Review</button
            > 

            <button mat-button color="accent" (click)="onEdit(med._id)">
              Edit</button
            > 

            <button mat-button color="warn" (click)="onDelete(med._id)">
              Delete</button
            ><br /> 
          </div>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: `
  .card-container{
    display:flex;
    justify-content:center;
    align-items:center;
 
  }
  .example-card {
  max-width: 350px;
 margin-top:30px
  }
  
  `,
})
export class MedComponent {
  readonly #medService = inject(MedService);
  readonly auth = inject(AuthService);
  medication_id = input<string>('');
  router = inject(Router);
  med: Med = {
    _id: '',
    name: '',
    generic_name: '',
    medication_class: '',
    availability: '',
    image:{ filename:'', originalname:''}
  };
  #notification = inject(ToastrService);
  constructor() {
    effect(() => {
      if (this.medication_id() !== '') {
        this.#medService
          .getMedById(this.medication_id())
          .subscribe((response) => {
            this.med = response.data;
          });
      }
    });
  }
  onEdit(_id: any) {
    console.log(_id, '.....'); //prints _id
    if (_id) {
      this.router.navigate(['', 'medications', 'update', _id]);
    } else {
      this.#notification.error('something went wrong');
    }
  }
  onReview(medication_id: any) {}
  onDelete(medication_id: any) {}
}
