import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/core/user.service';
import {AuthService} from 'src/app/core/auth.service';
import {Observable, Subscription} from 'rxjs';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {User} from '../../../shared/model/user';
import {AlertService} from '../../../core/alert.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import { UtilService } from 'src/app/core/util.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ErrorMessage } from 'src/app/shared/error-message';

@Component({
    selector: 'app-user',
    templateUrl: './user.page.html',
    styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
    private firebaseUser: firebase.User;
    private userSubscription: Subscription;

    private readonly mailRegex = new RegExp('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}');

    user: User = new User();

    private readonly cameraConfiguration: CameraOptions = {
        quality: 20,
        sourceType: this.$camera.PictureSourceType.CAMERA,
        destinationType: this.$camera.DestinationType.DATA_URL,
        encodingType: this.$camera.EncodingType.JPEG,
        mediaType: this.$camera.MediaType.PICTURE
    };

    constructor(
        private $userService: UserService,
        private $utilService: UtilService,
        private $camera: Camera,
        private $router: Router,
        private $alertService: AlertService,
        private $storage: AngularFireStorage,
        private $afAuth: AngularFireAuth
    ) { }

    async ngOnInit() {
        this.userSubscription = this.$userService.getUser().subscribe(x => {
            this.firebaseUser = x;
            this.user.email = x.email;
            this.$storage.ref(`${this.firebaseUser.uid}_logo.jpg`).getDownloadURL().toPromise().then(x => this.user.photoURL = x);
        });
    }

    /**
     * Take a picture and upload it to firebase.
     */
    async uploadPhoto() {
        this.$camera.getPicture(this.cameraConfiguration).then(async (data: string) => {
            const imageData = data;
            const image = this.$utilService.convertBase64ToBlob(imageData);

            const ref = this.$storage.ref(`${this.firebaseUser.uid}_logo.jpg`);
            const task = ref.put(image);

            this.firebaseUser.updateProfile({photoURL: `${this.firebaseUser.uid}_logo.jpg`});
        });
    }

    /**
     * Updates user generally
     */
    async updateUser() {
        if (!this.mailRegex.test(this.user.email)) {
            this.$alertService.alert(ErrorMessage.MailNotValid);
        } else {
            this.firebaseUser.updateEmail(this.user.email).then(x => {
                this.$alertService.alert('Sie müssen sich wieder anmelden!');
                this.$router.navigateByUrl('login');
            });
        }
    }

    /**
     * Logs the user out.
     */
    logout() {
        this.$afAuth.auth.signOut();
        this.$router.navigateByUrl('login');
    }
}
