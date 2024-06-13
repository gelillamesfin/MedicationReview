import {
  APP_INITIALIZER,
  ApplicationConfig,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { addTokenInterceptor } from './auth/add-token.interceptor'
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthService } from './auth/auth.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const bootstrap = () => {
  const auth = inject(AuthService);
  return () => {
    const persisted_state = localStorage.getItem('meduser');
    if (persisted_state) {
      auth.state$.set(JSON.parse(persisted_state));
    }
  };
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([addTokenInterceptor])),
    provideToastr(),
    provideAnimations(), provideAnimationsAsync(),
    { provide: APP_INITIALIZER, multi: true, useFactory: bootstrap },
  ],
};
