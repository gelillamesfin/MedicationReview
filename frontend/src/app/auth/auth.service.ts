import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { User } from '../../types';
import { environment } from '../../environments/environment.development';

export interface IState {
  _id: string;
  fullname: string;
  email: string;
  jwt: string;
}

export const initalState = {
  _id: '',
  fullname: 'Guest',
  email: '',
  jwt: '',
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  state$ = signal<IState>(initalState);
  readonly #http = inject(HttpClient);

  signup(userDetail: User) {
  
    return this.#http.post<{ success: boolean; data: User }>(
      environment['BACKEND-SERVER_URL'] + '/users/signup',
      userDetail
    );
  }
  signin(credentials: { email: string; password: string }) {
    return this.#http.post<{ success: boolean; data: string }>(
      environment['BACKEND-SERVER_URL'] + '/users/signin',
      credentials
    );
  }
  is_logged_in() {
    return this.state$()._id ? true : false;
  }
  constructor() {
    effect(() => {
      localStorage.setItem('meduser',JSON.stringify(this.state$()))
    });
  }
}
