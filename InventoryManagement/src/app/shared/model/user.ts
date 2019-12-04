export class User {
    photoURL: string = '';
    email: string = '';

    constructor(user?: firebase.User) {
        if (user != null) {
            this.photoURL = user.photoURL;
            this.email = user.photoURL;
        }
    }
}
