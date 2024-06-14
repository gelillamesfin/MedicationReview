import { Injectable, inject, signal } from '@angular/core';
import { Review } from '../meds/medTypes';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  auth=inject(AuthService)
  readonly #http=inject(HttpClient)
$reviews=signal<Review[]>([])
  constructor() { }


getMedReviewsbyId$(_id:string){
  return this.#http.get<{success:boolean,data:Review[]}>(environment['BACKEND-SERVER_URL']+`/medications/${_id}/reviews`)
}
addReview(review:Review,_id:string){
  console.log('inthe service')
return this.#http.post<{success:boolean,data:string}>(environment['BACKEND-SERVER_URL']+`/medications/${_id}/reviews`,review)
}
updateReview(newReview:Review,medication_id:string){
return this.#http.put<{success:boolean,data:boolean}>(environment['BACKEND-SERVER_URL']+`/medications/${medication_id}/reviews/${newReview._id}`,newReview)
}

deleteReview(medication_id:string,_id:string){
return this.#http.delete<{success:boolean,data:boolean}>(environment['BACKEND-SERVER_URL']+`/medications/${medication_id}/reviews/${_id}`)
}

}
