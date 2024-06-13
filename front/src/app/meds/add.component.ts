import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MedService } from './med.service';
import { newMed } from './medTypes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './add.html',

  styles: ``,
})
export class AddComponent {
  readonly #notification = inject(ToastrService);
  #medService = inject(MedService);
  readonly #router = inject(Router);
  firstFormGroup = inject(FormBuilder).group({
    name: ['', Validators.required],
    generic_name: ['', Validators.required],
    medication_class: ['', Validators.required],
    availability: ['', Validators.required],
  });

  isLinear = false;

  onAdd() {
 
    this.#medService
      .addMed(this.firstFormGroup.value as newMed)
      .subscribe((response) => {
        if (response.success) {
          this.#notification.success(
            `${this.firstFormGroup.value.medication_class} added successfully`
          );
          this.#router.navigate(['', 'medications', 'list']);
        } else {
          this.#notification.error(`something went wrong, please try again `);
        }
      });
  }
}
