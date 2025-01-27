import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Medication} from './medTypes';
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
  $meds = signal<Medication[]>([initalMedState]);
  readonly #http = inject(HttpClient);
getMeds$(first_letter: string = 'A') {
    return this.#http.get<{ success: boolean; data: Medication[] }>(
      environment['BACKEND-SERVER_URL'] +
        `/medications/?first_letter=${first_letter}`
    );
  }

  addMed(newMed:FormData) {
    return this.#http.post<{ success: boolean; data: Medication }>(
      environment['BACKEND-SERVER_URL'] + '/medications',
      newMed
    );
  }

  getMedById(_id: string|undefined) {
    return this.#http.get<{ success: boolean; data: Medication }>(
      environment['BACKEND-SERVER_URL'] + `/medications/${_id}`
    );
  }
  updateMedById(Med:FormData, _id: string) {
    return this.#http.put<{ success: boolean; data: Medication }>(
      environment['BACKEND-SERVER_URL'] + `/medications/${_id}`,
      Med
    );
  }

  
  deleteMedById(_id: string) {
    return this.#http.delete<{ success: boolean; data: boolean }>(
      environment['BACKEND-SERVER_URL'] + `/medications/${_id}`
    );
  }
 
  verify(name:string){
    return this.#http.get<{exists:boolean}>(environment['BACKEND-SERVER_URL'] + `/medications/verify/${name}`);
  }
  constructor() {}
}
