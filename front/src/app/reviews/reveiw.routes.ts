import { Routes } from "@angular/router";



export const reviews_routes: Routes = [
  
  {
    path: 'add/:_id',
    loadComponent: () =>
      import('./addreview.component').then((c) => c.AddReviewComponent),
  },
  {
    path:'update/:medication_id/:_id',loadComponent:()=>import('./update-review.component').then(c=>c.UpdateReviewComponent)
  }
];