import { Component, effect, inject, input, signal } from '@angular/core';
import { MedService } from './med.service';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
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
            <mat-card-title>{{ med().name }}</mat-card-title>
            <mat-card-subtitle>{{ med().generic_name }}</mat-card-subtitle
            ><br />
            <img
              mat-card-sm-image
              src="http://localhost:3000/medications/images/{{
                med().image?._id
              }}"
            />
          </mat-card-title-group>
        </mat-card-header>
        <div class="contentContainer">
          <mat-card-content>
            <span [ngStyle]="{ 'font-weight': 'bold' }"> Availability: </span
            >{{ med().availability }}<br />
            <span [ngStyle]="{ 'font-weight': 'bold' }"
              >Medication Class:
            </span>
            {{ med().medication_class }}

            <p></p>

            @if(auth.is_logged_in()&&(auth.state$()._id===
            med().added_by.user_id)){
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
            <p>Reviews</p>

            @for(review of med().reviews; track review){
            <div clss="review">
              <mat-card-header>
                <mat-card-title>{{ review.by.fullname }}</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p>rating: {{ review.rating }}</p>
                <p>Review: {{ review.review }}</p>
                <p>Date: {{ review.date | date }}</p>
              </mat-card-content>
              <mat-card-actions>
                @if(auth.is_logged_in()&&
                (review.by.user_id==auth.state$()._id)){
                <button (click)="onEditReview(review._id)">Edit</button>&nbsp;
                <button (click)="onDeleteReview(med()._id, review._id)">
                  Delete
                </button>

                }@if(auth.is_logged_in()&&
                (review.by.user_id!==auth.state$()._id)){
                <button>Helpful</button> &nbsp; <button>Report</button>&nbsp; }
              </mat-card-actions>
            </div>

            }
          </mat-card-content>
        </div>
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
  width: 100%;
 margin-top:30px
  }
   
    .contentContainer{
     display:flex;
    justify-content:center;
    align-items:center;
    }
  
  `,
})
export class MedComponent {
  readonly #medService = inject(MedService);
  readonly auth = inject(AuthService);
  readonly #reviewService = inject(ReviewService);
  // _id = model<string>('');
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
          // this.med.reviews=response.data.reviews
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
       // this.med.reviews=response.data.reviews
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
  ngDoCheck() {
    this.onDeleteReview;
  }
}
