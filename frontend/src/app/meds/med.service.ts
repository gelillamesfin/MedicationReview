import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Medication, newMed } from './medTypes';



export const initalMedState: Medication = {
  name: '',
  first_letter: '',
  generic_name: '',
  medication_class: '',
  availability: '',
  image: { filename: '', originalname: '' },
  added_by: { user_id: '', fullname: '', email: '' },
  reviews: [],
};

@Injectable({
  providedIn: 'root',
})
export class MedService {
  meds$ = signal(initalMedState);
  readonly #http = inject(HttpClient);

  getMeds$(first_letter: string = 'A') {
    this.#http.get(
      environment['BACKEND-SERVER_URL'] + `/medications/${first_letter}`
    );
  }

addMed(newMed:newMed){
return (this.#http.post<{success:boolean,data:Medication}>(environment['BACKEND-SERVER_URL']+'/medications',newMed))
}
  constructor() {}
}