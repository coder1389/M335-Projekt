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

  async getUser() {
    this.user = await firebase.auth().currentUser ? firebase.auth().currentUser.providerData[0] : null;
    if (!this.user) {
      this.user = await this.$authService.login(sessionStorage.getItem('mail'), sessionStorage.getItem('password'));
    }

    return this.user;
  }

  async updateUser(user: any) {
    this.$fbAuth.auth.updateCurrentUser(user);
  }
}
