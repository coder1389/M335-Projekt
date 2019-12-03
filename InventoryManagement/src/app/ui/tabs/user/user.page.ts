import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/core/user.service';
import {AuthService} from 'src/app/core/auth.service';
import {Observable, Subscription} from 'rxjs';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';

@Component({
    selector: 'app-user',
    templateUrl: './user.page.html',
    styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
    user: firebase.User;
    private userSubscription: Observable<any>;

    private readonly cameraConfiguration: CameraOptions = {
        quality: 20,
        sourceType: this.$camera.PictureSourceType.CAMERA,
        destinationType: this.$camera.DestinationType.DATA_URL,
        encodingType: this.$camera.EncodingType.JPEG,
        mediaType: this.$camera.MediaType.PICTURE
    };

    constructor(private $userService: UserService, private $authService: AuthService, private $camera: Camera) {
    }

    ngOnInit() {
        this.userSubscription = this.$userService.User;
        this.userSubscription.subscribe(x => {
            this.user = x;
            console.log(this.user.photoURL);
        });
    }

    uploadPhoto() {
        this.$camera.getPicture(this.cameraConfiguration).then((data: string) => {
            this.user.photoURL = 'data:image/jpeg;base64,' + data;
        });

        this.$userService.updateUser(this.user);
    }

    async updateUser() {
        await this.$userService.updateUser(this.user);
    }
}
