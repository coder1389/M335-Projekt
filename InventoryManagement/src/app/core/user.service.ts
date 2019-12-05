import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from './auth.service';
import {User} from '../shared/model/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private user: any;

    constructor(private $fbAuth: AngularFireAuth, private $authService: AuthService) {
    }

    /**
     * Returns the currently authenticated user
     */
    getUser() {
        return this.$fbAuth.user;
    }

    /*async updateUser(user: fireUser) {
        await this.$fbAuth.auth.updateCurrentUser({
          photoURL: user.photoURL,
          email: user.email
        }).then(x => x);
    }*/
}
