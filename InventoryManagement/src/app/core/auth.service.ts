import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UtilService } from './util.service';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private $afAuth: AngularFireAuth, private $utilService: UtilService) { }

    /**
     * Authenticates the user to firebase
     * @param mail
     * @param password
     */
  public async login(mail: string, password: string) {
      await this.$afAuth.auth.signInWithEmailAndPassword(mail, password)
          .then(x => this.$utilService.Credentials = x)
          .catch(x => { throw x; });

      sessionStorage.setItem('mail', mail);
      sessionStorage.setItem('password', password);
  }
}
