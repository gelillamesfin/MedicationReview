import { Routes } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';

export const meds_routes: Routes = [
  {
    path: 'add',
    loadComponent: () => import('./add.component').then((c) => c.AddComponent),
  },

  {
    path: 'update/:_id',
    loadComponent: () =>
      import('./update.component').then((c) => c.UpdateComponent),
    canActivate: [() => inject(AuthService).is_logged_in()],
  },

  {
    path: ':_id',
    loadComponent: () => import('./med.component').then((c) => c.MedComponent),
  },
  {
    path: 'reviews/list',
    loadComponent: () =>
      import('../reviews/review-list.component').then(
        (c) => c.ReviewListComponent
      ),
  },
  {
    path: 'reviews',
    loadChildren: () =>
      import('../reviews/reveiw.routes').then((r) => r.meds_routes),
  },
];
