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
            <img
              mat-card-sm-image
              src="https://material.angular.io/assets/img/examples/shiba2.jpg"
            />
          </mat-card-title-group>
        </mat-card-header>
        <mat-card-content>
          <span [ngStyle]="{ 'font-weight': 'bold' }"> Availability: </span
          >{{ med.availability }}<br />
          <span [ngStyle]="{ 'font-weight': 'bold' }">Medication Class: </span>
          {{ med.medication_class }}
          <p></p>
<p>Reviews</p>

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
  _id = input<string>('');
  router = inject(Router);
  med: Med = {
    _id: '',
    name: '',
    generic_name: '',
    medication_class: '',
    availability: '',
  };
  #notification = inject(ToastrService);
  constructor() {
    effect(() => {
      if (this._id() !== '') {
        this.#medService.getMedById(this._id()).subscribe((response) => {
          this.med = response.data;
        });
      }
    });
  }
  onEdit(_id: any) {
    if (_id) {
      this.router.navigate(['', 'medications', 'update', _id]);
    } else {
      this.#notification.error('something went wrong');
    }
  }
  onReview(_id: any) {
    if(_id){
      this.router.navigate(['','medications','reviews','update',_id])
    }
  }
  onDelete(medication_id: any) {
    const confirmation:any=confirm('are you sure ')
    if (medication_id && confirmation) {
      this.#medService.deleteMedById(medication_id).subscribe((response) => {
        if (response.success) {
          this.#notification.success('deleted successfully')

          this.#medService.$meds.update((oldMeds) => 
            oldMeds.filter((med) => med._id !== medication_id));
          this.router.navigate(['','medications','list'])
        }

      });
    }
  }
}
