import { Component, effect, inject, input, signal } from '@angular/core';
import { MedService } from './med.service';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { MatIconModule} from '@angular/material/icon';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Medication } from './medTypes';
import { ReviewService } from '../reviews/review.service';


@Component({
  selector: 'app-med',
  standalone: true,
  imports: [MatCardModule, NgStyle, MatIconModule, NgClass, DatePipe],
  template: `
    <div class="card-container">
      <mat-card class="example-card">
        <mat-card-header>
          <mat-card-title-group>
            <mat-card-title
              [ngStyle]="{
                'font-weight': 'bold',
                'font-size': '40px',
                color: 'black'
              }"
              >{{ med().name }}</mat-card-title
            >

            <mat-card-subtitle
              [ngStyle]="{ 'margin-top': '30px', color: 'black' }"
            >
              <span [ngStyle]="{ 'font-weight': 'bold' }">Generic Name:</span>
              {{ med().generic_name }}</mat-card-subtitle
            ><br />

            <img
              mat-card-image
              src="http://localhost:3000/medications/images/{{
                med().image?._id
              }}"
              style="width:250px"
            />
          </mat-card-title-group>
        </mat-card-header>
        <div class="contentContainer">
          <mat-card-content>
            <span [ngStyle]="{ 'font-weight': 'bold', 'font-size': '25px' }">
              Availability: </span
            >{{ med().availability }}<br />
            <span [ngStyle]="{ 'font-weight': 'bold', 'font-size': '25px' }"
              >Medication Class:
            </span>
            {{ med().medication_class }}

            <p></p>

            @if(auth.is_logged_in()&&(auth.state$()._id===med().added_by.user_id)){
            <button mat-button color="accent" (click)="onEdit(med()._id)">
              Edit</button
            >&nbsp;

            <button mat-button color="warn" (click)="onDelete(med()._id)">
              Delete
            </button>

            }
            @if(auth.is_logged_in()&&(auth.state$()._id!==med().added_by.user_id)){

            <button mat-button color="primary" (click)="onReview(med()._id)">
              Review
            </button>

            }
            <p [ngStyle]="{ 'font-weight': 'bold', 'font-size': '40px' }">
              Reviews
            </p>
            @if(med().reviews.length===0){
              No Reviews yet, be the first to review.
            }@else{
            @for(review of med().reviews; track review){
           <div class="review">
              <mat-card-header>
                <mat-card-title
                  [ngStyle]="{ 'font-weight': 'bold', 'font-size': '20px' }"
                >
                  {{ review.by.fullname }}
                  <span [ngStyle]="{ 'margin-right': '80' }">
                    @for(stars of generateStars(review.rating); track $index){
                    <mat-icon
                      aria-hidden="false"
                      fontIcon="star"
                      class="star"
                    ></mat-icon>
                    }
                  </span>
                </mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p></p>
                <p>
                  <span [ngStyle]="{ 'font-weight': 'bold' }">Review:</span>
                  {{ review.review }}
                </p>
                <p>
                  <span [ngStyle]="{ 'font-weight': 'bold' }"> Date:</span>
                  {{ review.date | date }}
                </p>
              </mat-card-content>
              <mat-card-actions>
                @if(auth.is_logged_in()&&(review.by.user_id===auth.state$()._id)){
                <button
                  (click)="onEditReview(review._id)"
                  [ngStyle]="{
                    'background-color': '#ffe6e6',
                    border: 'none',
                    color: 'blue'
                  }"
                >
                  Edit</button
                >&nbsp;
                <button
                  (click)="onDeleteReview(med()._id, review._id)"
                  [ngStyle]="{
                    'background-color': '#ffe6e6',
                    border: 'none',
                    color: 'blue'
                  }"
                >
                  Delete</button
                >}
              </mat-card-actions>
            </div>
}
              }  </mat-card-content>
        </div>
      </mat-card>
    </div>
  `,
  styles: `
  .mat-card-image{
align-items:center;
  }
  .card-container{
    display:flex;
    justify-content:center;
    align-items:center;
     }
  .example-card {
  width: 100%;
 margin-top:30px;
 background-color:#ffe6e6
  }
   .contentContainer{
     display:flex;
    justify-content:center;
    align-items:center;
// margin-bottom:100%
    }
  .star{
  color:orange;
  display:inline-block;

}.review-text {
  flex-grow: 1;
  margin-right: 16px; 
}
.review{
  align-items:center;
  justify-content:center
}
  `,
})
export class MedComponent {
  readonly #medService = inject(MedService);
  readonly auth = inject(AuthService);
  readonly #reviewService = inject(ReviewService);
  _id = input<string>('');
  router = inject(Router);
  med = signal<Medication>({
    _id: '',
    name: '',
    first_letter: '',
    generic_name: '',
    medication_class: '',
    availability: '',
    image: { filename: '', originalname: '' },
    added_by: { user_id: '', fullname: '', email: '' },
    reviews: [
      {
        review: '',
        rating: 0,
        by: { user_id: '', fullname: '' },
        date: 0,
      },
    ],
  });
  #notification = inject(ToastrService);
  constructor() {
    effect(() => {
      if (this._id() !== '') {
        this.#medService.getMedById(this._id()).subscribe((response) => {
          this.med.set(response.data);
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

  onDelete(medication_id: any) {
    const confirmation: any = confirm('are you sure ');
    if (medication_id && confirmation) {
      this.#medService.deleteMedById(medication_id).subscribe((response) => {
        if (response.success) {
          this.#notification.success('deleted successfully');

          this.#medService.$meds.update((oldMeds) =>
            oldMeds.filter((med) => med._id !== medication_id)
          );
          this.router.navigate(['', 'medications', 'list']);
        }
      });
    }
  }
  onDeleteReview(medication_id: any, _id: any) {
    const confirmation = confirm('delete review?');
    if (_id && confirmation) {
      this.#reviewService
        .deleteReview(medication_id, _id)
        .subscribe((response) => {
          if (response.success) {
            this.#notification.warning(`Review deleted`);
            this.#reviewService.$reviews.update((oldReview) =>
              oldReview.filter((review) => review._id !== _id)
            );
            if (this._id() !== '') {
              this.#medService.getMedById(this._id()).subscribe((response) => {
                this.med.set(response.data);
              });
            }
            this.router.navigate(['', 'medications', this._id()]);
          }
        });
    }
  }
  onReview(_id: any) {
    if (_id) {
      this.router.navigate(['', 'medications', 'reviews', 'add', _id]);
    }
  }
  onEditReview(_id: any) {
    this.router.navigate([
      '',
      'medications',
      'reviews',
      'update',
      this.med()._id,
      _id,
    ]);
  }

  generateStars(rating: number): number[] {
    return Array.from({ length: rating });
  }
}
