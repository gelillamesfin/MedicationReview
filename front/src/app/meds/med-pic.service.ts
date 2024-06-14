import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MedPicService {
  readonly #http = inject(HttpClient);
  readonly #auth = inject(AuthService);
  constructor() {}
}
