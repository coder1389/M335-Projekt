import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/core/user.service';
import {AuthService} from 'src/app/core/auth.service';
import {Observable, Subscription} from 'rxjs';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {User} from '../../../shared/model/user';
import {AlertService} from '../../../core/alert.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
    selector: 'app-user',
    templateUrl: './user.page.html',
    styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
    user: User = new User();
    private firebaseUser: firebase.User;
    private userSubscription: Subscription;

    private readonly cameraConfiguration: CameraOptions = {
        quality: 20,
        sourceType: this.$camera.PictureSourceType.CAMERA,
        destinationType: this.$camera.DestinationType.DATA_URL,
        encodingType: this.$camera.EncodingType.JPEG,
        mediaType: this.$camera.MediaType.PICTURE
    };

    constructor(
        private $userService: UserService,
        private $authService: AuthService,
        private $camera: Camera,
        private $router: Router,
        private $alertService: AlertService,
        private $storage: AngularFireStorage
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
            const image = data;

            const ref = this.$storage.ref(`${this.firebaseUser.uid}_logo.jpg`);
            const task = ref.put(this.dataURItoBlob(image));

            this.firebaseUser.updateProfile({photoURL: `${this.firebaseUser.uid}_logo.jpg`}).catch(x => this.$alertService.alert(x));
        });
    }

    /**
     * Converts the image base64 string to s
     * @param dataURI
     */
    private dataURItoBlob(dataURI) {
        const byteString = window.atob(dataURI);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: 'image/jpg' });
        return blob;
    }

    /**
     * Updates user generally
     */
    async updateUser() {
        this.firebaseUser.updateEmail(this.user.email).then(x => {
            this.$alertService.alert('Sie müssen sich wieder anmelden!');
            this.$router.navigateByUrl('login');
        });
    }

    /**
     * Logs the user out.
     */
    logout() {
        this.$router.navigateByUrl('login');
    }
}
