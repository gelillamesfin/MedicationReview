import { Component, effect, inject, input, signal } from '@angular/core';
import { MedService } from './med.service';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Medication } from './medTypes';
import { ReviewService } from '../reviews/review.service';
 import { DomSanitizer } from '@angular/platform-browser';
 
const THUMBUP_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.` +
  `44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5` +
  `1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
  </svg>`

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
               [ngStyle]="{ 'font-weight': 'bold', 'font-size': '40px' }"
               >{{ med().name }}</mat-card-title
             >

             <mat-card-subtitle [ngStyle]="{ 'margin-top': '30px' }">
               <span [ngStyle]="{ 'font-weight': 'bold' }">Generic Name:</span>
               {{ med().generic_name }}</mat-card-subtitle
             ><br />
             
             <img
               mat-card-lg-image
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

             @for(review of med().reviews; track review){
             <div clss="review">
               <mat-card-header>
                 <mat-card-title [ngStyle]="{ 'font-weight': 'bold', 'font-size': '20px' }">
                   {{ review.by.fullname }}</mat-card-title
                 >
               </mat-card-header>
               <mat-card-content>
                 <p>
                   <span [ngStyle]="{ 'font-weight': 'bold' }">rating:</span>
                   {{ review.rating }}
                 </p>
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
                 <button (click)="onEditReview(review._id)">Edit</button>&nbsp;
                 <button (click)="onDeleteReview(med()._id, review._id)">
                   Delete
                 </button>

                 }@if((review.by.user_id!==auth.state$()._id)){
                 <!-- <button>Helpful</button> &nbsp; -->
                 <mat-icon
                   svgIcon="thumbs-up"
                   aria-hidden="false"
                   aria-label="Example thumbs up SVG icon"
                 ></mat-icon>
                 &nbsp;&nbsp; <button>Report</button>&nbsp; }
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
   constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
     iconRegistry.addSvgIconLiteral(
       'thumbs-up',
       sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON)
     );
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
  //  ngDoCheck() {
  //    this.onDeleteReview;
  //  }
 }
