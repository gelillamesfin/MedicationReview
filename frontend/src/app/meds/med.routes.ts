import { Routes } from '@angular/router';

export const meds_routes: Routes = [
  {
    path: 'add',
    loadComponent: () => import('./add.component').then((c) => c.AddComponent),
  },
  {
    path: 'update/:medication_id',
    loadComponent: () =>
      import('./update.component').then((c) => c.UpdateComponent),
  }
  ,
  // {
  //   path: ':medication_id',
  //   loadComponent: () => import('./med.component').then((c) => c.MedComponent),
  // },
  {
    path: ':medication_id/reviews',
    loadComponent: () => import('./med-review.component').then((c) => c.MedReviewComponent),
  },
];
