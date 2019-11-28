import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: any;

  constructor(private $fbAuth: AngularFireAuth) {}

  async getUser() {
    return this.$fbAuth.auth.currentUser.providerData[0];
  }

  async updateUser(user: any) {
    this.$fbAuth.auth.updateCurrentUser(user);
  }
}
