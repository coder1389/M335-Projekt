import {Component, OnDestroy, OnInit, Sanitizer} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {ItemService} from 'src/app/core/item.service';
import {Item} from 'src/app/shared/model/item';
import {AlertService} from 'src/app/core/alert.service';
import {Subscription} from 'rxjs';
import {ErrorMessage} from '../../shared/error-message';

@Component({
    selector: 'app-create-edit',
    templateUrl: './create-edit.page.html',
    styleUrls: ['./create-edit.page.scss'],
})
export class CreateEditPage implements OnInit, OnDestroy {

    item: Item = new Item();

    image: string;

    private routeSubscription: Subscription;
    private itemSubscription: Subscription;

    private readonly cameraConfiguration: CameraOptions = {
        quality: 20,
        sourceType: this.$camera.PictureSourceType.CAMERA,
        destinationType: this.$camera.DestinationType.DATA_URL,
        encodingType: this.$camera.EncodingType.JPEG,
        mediaType: this.$camera.MediaType.PICTURE
    };

    constructor(
        private $camera: Camera,
        private $itemService: ItemService,
        private $router: Router,
        private $alertService: AlertService,
        private $sanitizer: Sanitizer,
        private $route: ActivatedRoute
    ) { }

    /**
     * Happens when the page is fully initialized
     */
    async ngOnInit() {
        let id = '';
        this.routeSubscription = this.$route.params.subscribe(async params => {
            id = params['id'];
        });

        if (id !== '0') {
            this.itemSubscription = this.$itemService.get(id).subscribe(x => {
                this.item = x;
                this.item.Id = id;
            });
        }
    }

    /**
     * Gets executed when the component is being closed.
     */
    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();

        if (this.itemSubscription !== undefined) {
            this.itemSubscription.unsubscribe();
        }
    }

    /**
     * Takes a picture with the provided camera
     */
    async takePicture() {
        this.$camera.getPicture(this.cameraConfiguration).then((data: string) => {
            this.item.Image = 'data:image/jpeg;base64,' + data;
        }).catch(e => {
            this.$alertService.alert(e);
        });
    }

    /**
     * Set image to an empty base64 string
     */
    deletePicture() {
        this.item.Image = '';
    }

    /**
     * Saves the data to the database
     */
    save() {
        if (this.item.Name === '') {
            this.$alertService.alert(ErrorMessage.NoName);
        } else if(this.item.Count < 0) {
            this.$alertService.alert(ErrorMessage.CountLessThanZero);
        } else {
            this.$itemService.add(this.item);
            this.ngOnDestroy();
            this.$router.navigate(['tabs/overview']);
        }
    }
}
