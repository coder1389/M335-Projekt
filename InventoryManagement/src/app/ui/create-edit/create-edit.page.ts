import {Component, OnDestroy, OnInit, Sanitizer, SecurityContext} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {ItemService} from 'src/app/core/item.service';
import {Item} from 'src/app/shared/model/item';
import {AlertService} from 'src/app/core/alert.service';
import {Subscription} from 'rxjs';

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
        quality: 35,
        destinationType: this.$camera.DestinationType.FILE_URI,
        encodingType: this.$camera.EncodingType.JPEG,
        mediaType: this.$camera.MediaType.PICTURE,
        allowEdit: true,
        saveToPhotoAlbum: true
  };

  constructor(
              private $camera: Camera,
              private $itemService: ItemService,
              private $router: Router,
              private $alertService: AlertService,
              private $sanitizer: Sanitizer,
              private $route: ActivatedRoute

  ) { }

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
          console.log(this.item);
      }
  }

  ngOnDestroy(): void {
      this.routeSubscription.unsubscribe();
      this.itemSubscription.unsubscribe();
  }

    async makeFoto() {
    try {
      this.$camera.getPicture(this.cameraConfiguration).then((imageData) => {
        this.item.Image = imageData;
        this.$alertService.alert(imageData);
      });
    } catch (e) {
      this.$alertService.alert(e.message);
    }
  }

  save() {
    this.$itemService.add(this.item);
    this.$router.navigate(['tabs/overview']);
  }
}
