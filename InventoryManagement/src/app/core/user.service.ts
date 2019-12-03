import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: any;

  constructor(private $fbAuth: AngularFireAuth, private $authService: AuthService) {}

  get User() {
    return this.$fbAuth.user;
  }

  async updateUser(user: firebase.User) {
    await this.$fbAuth.auth.updateCurrentUser(user);
  }
}
