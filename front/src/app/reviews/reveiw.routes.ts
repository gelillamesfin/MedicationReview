import { Routes } from "@angular/router";
 
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';


export const meds_routes: Routes = [
  
  {
    path: 'add',
    loadComponent: () =>
      import('./addreview.component').then((c) => c.AddReviewComponent),
  },
  {
    path:'update/:_id',loadComponent:()=>import('./update-review.component').then(c=>c.UpdateReviewComponent)
  }
];