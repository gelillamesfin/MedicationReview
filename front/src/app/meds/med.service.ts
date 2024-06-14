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
  $meds = signal<Medication[]>([initalMedState]);
  $allMeds=signal<Medication[]>([])
  readonly #http = inject(HttpClient);


// getAll$(){
//   console.log('inside get all...')
// const alphabets=['b','c','d']
// for(let letter of alphabets){
// const all= (this.getMeds$(letter)).subscribe(response=>{
//   if(response.success){

//     this.$allMeds.set(response.data)
//   }
// console.log('data from all meds',all)
// })
// }
// }


  getMeds$(first_letter: string = 'A') {
    return this.#http.get<{ success: boolean; data: Medication[] }>(
      environment['BACKEND-SERVER_URL'] +
        `/medications/?first_letter=${first_letter}`
    );
  }

  addMed(newMed: newMed) {
    return this.#http.post<{ success: boolean; data: Medication }>(
      environment['BACKEND-SERVER_URL'] + '/medications',
      newMed
    );
  }

  getMedById(_id: string) {
    return this.#http.get<{ success: boolean; data: Medication }>(
      environment['BACKEND-SERVER_URL'] + `/medications/${_id}`
    );
  }
  updateMedById(Med:newMed,_id:string) {
   return  this.#http.put<{ success: boolean; data: Medication }>(
      environment['BACKEND-SERVER_URL'] + `/medications/${_id}`,Med
    );
    
  }

  deleteMedById(_id:string){
return this.#http.delete<{success:boolean;data:boolean}>(environment['BACKEND-SERVER_URL']+`/medications/${_id}`)
  }
  constructor() {}
}