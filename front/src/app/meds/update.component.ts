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
        <p></p>

        
        <button mat-button color="primary" type="submit">Save</button> 
        <button mat-button color="accent" (click)="onBack()">Back</button>   
      
      </form>

      

      <!-- </mat-card-content>
      </mat-card> -->
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
  readonly #medService = inject(MedService);
  // readonly auth = inject(AuthService);
  _id = input<string>('');
  #notification = inject(ToastrService);
  router = inject(Router);
  form = inject(FormBuilder).group({
    // medication_id: ['',Validators.required],
    name: ['', Validators.required],
    medication_class: ['', Validators.required],
    generic_name: ['', Validators.required],
    availability: ['Prescription', Validators.required],
  });

  constructor() {
    effect(() => {
      if (this._id())
        this.#medService.getMedById(this._id()).subscribe((response) => {
          this.form.patchValue(response.data);
        });
    });
  }

  onSubmit() {

    this.#medService
      .updateMedById(this.form.value as Med, this._id())
      .subscribe((response) => {
        if (response.success) {
          this.#notification.success(`updated Successfully`);
          this.router.navigate(['', 'medications', 'list']);
        } else {
          this.#notification.error(`Failed updating`);
        }
      });
  }
  onBack() {
    this.router.navigate(['','medications','list'])
    this.#notification.warning(`no updates made `)
  
  }
}
