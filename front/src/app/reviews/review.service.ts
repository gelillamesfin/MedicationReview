import { Injectable, inject, signal } from '@angular/core';
import { Review } from '../../../types';
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


getReviews$(){
  // return this.#http.get<{success:boolean,data:Review[]}>(environment['BACKEND-SERVER_URL'])
}
addReview(medication_id:string){

}
updateReview(_id:string){

}

deleteReview(medication_id:string,_id:string){

}

}
