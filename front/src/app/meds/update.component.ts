import { Component, effect, inject, input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MedService } from './med.service';
import { Med, Medication, newMed } from './medTypes';

import { MatCardModule } from '@angular/material/card';
import { NgClass, NgStyle } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  standalone: true,

  imports: [
    MatCardModule,
    NgStyle,
    MatIconModule,
    NgClass,
    ReactiveFormsModule,
  ],

  template: `
    <div class="card-container">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <span [ngStyle]="{ 'font-weight': 'bold' }"> Name: </span><br />
        <input placeholder="name" formControlName="name" /><br />

        <span [ngStyle]="{ 'font-weight': 'bold' }"> medication class: </span
        ><br />
        <textarea
          placeholder="medication_class"
          formControlName="medication_class"
        ></textarea>
        <br />
        <span [ngStyle]="{ 'font-weight': 'bold' }"> generic Name: </span><br />

        <input
          placeholder="generic_name"
          formControlName="generic_name"
        /><br />
      
        <input
        type="file"
        formControlName="image"
        (change)="setFile($event)"
        />
      <p></p>
    
    <button mat-button color="primary" type="submit">Save</button>
  <button mat-button color="accent" (click)="onBack()">Back</button>
  </form>
    </div>
  `,
  styles: `
    .card-container{
    display:flex;
    justify-content:space-around;
    align-items:center;
    margin-top:40px
 
  }
  .example-card {
  max-width: 350px;
 margin-top:40px
  }
  
  
  `,
})
export class UpdateComponent {
  file!: File;
  readonly #medService = inject(MedService);
  _id = input<string>('');
  #notification = inject(ToastrService);
  router = inject(Router);
  form = inject(FormBuilder).group({
    name: ['', Validators.required],
    medication_class: ['', Validators.required],
    generic_name: ['', Validators.required],
    availability: ['Prescription', Validators.required],
    //  image: '',
  });

  setFile(event: Event) {
    this.file = (event.target as HTMLInputElement).files![0]; //get the first file from the obj
  }

  constructor() {
    effect(() => {
      if (this._id())
        this.#medService.getMedById(this._id()).subscribe((response) => {
          this.form.patchValue(response.data);
        });
    });
  }

  onSubmit() {
     const formData = new FormData();
     formData.append('name', this.form.value.name!);
     formData.append('generic_name', this.form.value.generic_name!);
     formData.append('availability', this.form.value.availability!);
     formData.append('medication_class', this.form.value.medication_class!);
     formData.append('medication_image', this.file);

    const confirmation = confirm('save changes?');
    if (confirmation && this._id()) {
      this.#medService
        .updateMedById(formData, this._id())
        .subscribe((response) => {
          if (response.success) {
            this.#notification.success(`updated Successfully`);
            this.router.navigate(['', 'medications', 'list']);
          } else {
            this.#notification.error(`Failed updating`);
          }
        });
    }
  }
  onBack() {
    this.router.navigate(['', 'medications', 'list']);
    this.#notification.warning(`no updates made `);
  }
}
