import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ItemService } from 'src/app/core/item.service';
import { Item } from 'src/app/shared/model/item';
import { AlertService } from 'src/app/core/alert.service';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.page.html',
  styleUrls: ['./create-edit.page.scss'],
})
export class CreateEditPage implements OnInit {

  item: Item = new Item();

  private readonly cameraConfiguration: CameraOptions = {
        quality: 35,
        destinationType: this.$camera.DestinationType.DATA_URL,
        encodingType: this.$camera.EncodingType.JPEG,
        mediaType: this.$camera.MediaType.PICTURE
  };

  constructor(private $camera: Camera, private $itemService: ItemService, private $router: Router, private $alertService: AlertService) { }

  ngOnInit() { }

  async makeFoto() {
    try {
      await this.$camera.getPicture(this.cameraConfiguration).then((imageData) => {
        this.item.Image = 'data:image/jpeg:base64,' + imageData;
      });
    } catch {
      this.$alertService.alert('Camera not available: Dev version on Web!');
    }
  }

  save() {
    this.$itemService.add(this.item);
    this.$router.navigate(['tabs/overview']);
  }
}
