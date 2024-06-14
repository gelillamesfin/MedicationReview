import {
 
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReviewService } from './review.service';
import { Review } from '../../../types';
@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  template: `
    <p class="container">Your Feedback is Valuable to us {{_id()}}</p>

    <br />
    <div class="container">
      <form [formGroup]="form">
        <mat-form-field hintLabel="Max 10 characters">
          <mat-label>Enter some input</mat-label>
          <input
            matInput
            #input
            maxlength="100"
            placeholder="how did it help?"
            formControlName="review"
          />
          <mat-hint align="end">{{ value().length }}/100</mat-hint>
        </mat-form-field>
        <br />
        <mat-form-field>
          <mat-label>Rating</mat-label>
          <mat-select formControlName="rating">
            <mat-option value="5">5</mat-option>
            <mat-option value="4">4</mat-option>
            <mat-option value="3">3</mat-option>
            <mat-option value="2">2</mat-option>
            <mat-option value="1">1</mat-option>
          </mat-select>
          <mat-hint align="end"></mat-hint>
        </mat-form-field>
      </form>
    </div>

    <div class="container">
      <button (click)="onBack()">Back</button>&nbsp;

      <button (click)="onAdd()" [disabled]="form.invalid">Add</button>&nbsp;
    </div>
  `,
  styles: `
  
//   .example-container mat-form-field + mat-form-field {
//   margin-left: 8px;
// } 
.container{
    display:flex;
    justify-content:center;
    align-items:center;
 margin-top:20px
  }
  
  `,
})
export class AddReviewComponent {
  #notification = inject(ToastrService);
  #router = inject(Router);
readonly #reviewService=inject(ReviewService)
  _id=input()
  form = inject(FormBuilder).nonNullable.group({
    review: ['', Validators.required],
    rating: ['', Validators.required],
  });
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
    console.log(this.form.value, 'inside....');
  }
  onAdd() {
    console.log(this.form.value, 'inside');
    // this.#reviewService.addReview(this.form.value as Review,this._id()).subscribe(response=>{

    // })
    
  }

  onBack() {

     this.#router.navigate(['', 'medications', 'list']);
  }
}
