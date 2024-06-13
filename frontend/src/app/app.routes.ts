import { Router, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin.component';
import { inject } from '@angular/core';
import { AuthService } from './auth/auth.service';

// const signin_guard = () => {
//   const router = inject(Router);
//   const signed_in = inject(AuthService).is_logged_in();
//   if (signed_in) {
//     router.navigate(['', 'meds', 'list']);
//     return false;
//   } else {
//     return true;
//   }
// };

export const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [() => !inject(AuthService).is_logged_in()],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./auth/signup.component').then(c => c.SignupComponent),
    canActivate: [() => !inject(AuthService).is_logged_in()],
  },
  {
    path: 'medications/list',
    loadComponent: () =>
      import('./meds/list.component').then((c) => c.ListComponent),
  },
 
  {
    path: 'medications',
    loadChildren: () => import('./meds/med.routes').then((r) => r.meds_routes),
    //  canActivate: [() => inject(AuthService).is_logged_in()],
  },
  { path: '**', redirectTo: '' },
];
