import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseAuth } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private $fbAuth: AngularFireAuth) { }

  async getUser() {
    return this.$fbAuth.user.subscribe(x => x);
  }
}
