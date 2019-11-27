import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UtilService } from './util.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private $afAuth: AngularFireAuth, private $utilService: UtilService) { }

  public async login(mail: string, password: string) {
    let result = await this.$afAuth.auth.signInWithEmailAndPassword(mail, password);
    console.log(result)
    this.$utilService.Credentials = result;
  }
}
