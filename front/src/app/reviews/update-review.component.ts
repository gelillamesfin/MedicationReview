import { Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReviewService } from './review.service';
import { Review } from '../meds/medTypes';
@Component({
  selector: 'app-update-review',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  template: `
    <p class="container">Updating your Review for {{ _id() }}</p>

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

      <button (click)="onSave()" [disabled]="form.invalid">Add</button>&nbsp;
    </div>
  `,
  styles: ``,
})
export class UpdateReviewComponent {
  _id = input<string>('');
  #notification = inject(ToastrService);
  #router = inject(Router);
  readonly #reviewService = inject(ReviewService);

  form = inject(FormBuilder).nonNullable.group({
    review: ['', Validators.required],
    rating: [0, Validators.required],
  });
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
    console.log(this.form.value, 'inside....');
  }

  constructor() {//need the medication id as well!
    // effect(() => {
    //   if (this._id())
    //     this.#reviewService.getMedReviewsbyId$(this._id()).subscribe((response) => {
    //       this.form.patchValue(response.data);
    //     });
    // });
  }





  
  onSave() {
    const confirmation = confirm('save changes?');
    if (confirmation && this._id()) {
      this.#reviewService
        .updateReview(this.form.value as Review, this._id())
        .subscribe((response) => {
          if (response.success) {
            this.#notification.success(`Review updated`);
            this.#router.navigate(['', 'medications', 'list']);
          } else {
            this.#notification.error(`Failed updating review`);
          }
        });
    }
  }

  onBack() {
    this.#router.navigate(['', 'medications', 'list']);
    this.#notification.warning(`no updates made `);
  }
}
