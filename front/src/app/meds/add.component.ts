import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MedService } from './med.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
  file!: File;
  readonly #notification = inject(ToastrService);
  #medService = inject(MedService);
  readonly #router = inject(Router);
  firstFormGroup = inject(FormBuilder).nonNullable.group({
    name: [
      '',
      {
        validators: [Validators.required],
        asyncValidators: this.validatorAsync.bind(this),
        updateOn: 'blur',
      },
    ],
    generic_name: ['', Validators.required],
    medication_class: ['', Validators.required],
    availability: ['', Validators.required],
    image: '',
  });
  // {validators:this.validatorAsync}
  isLinear = false;

  setFile(event: Event) {
    this.file = (event.target as HTMLInputElement).files![0]; //get the first file from the obj
  }
  // constructor(){
  //    this.firstFormGroup.controls.name.valueChanges.pipe(debounceTime(1000),

  //   // mergeMap(name=>this.))

  // }

  get name() {
    return this.firstFormGroup.controls.name;
  }
  onAdd() {
    const formData = new FormData();

    formData.append('name', this.firstFormGroup.value.name!);
    formData.append('generic_name', this.firstFormGroup.value.generic_name!);
    formData.append('availability', this.firstFormGroup.value.availability!);
    formData.append(
      'medication_class',
      this.firstFormGroup.value.medication_class!
    );
    formData.append('medication_image', this.file);

    this.#medService.addMed(formData).subscribe((response) => {
      console.log(response.data.image, 'image data from on add response data ');
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

  validatorAsync(control: AbstractControl): any {
     return this.#medService.verify({name:this.name.value})

     
  
    // let entered = control.get('name')?.value;
    // let first_letter=entered?.charAt(0)
    // let res=this.#medService.getMeds$(first_letter).subscribe(response=>{
    //   if(response.success){
    //     return null;
    //   }else {
    //     return ({medExists:true})
    //   return response.data;
    //   }
    // })
  }
}
