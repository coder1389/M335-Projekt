import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { ItemService } from 'src/app/core/item.service';
import { Item } from 'src/app/shared/model/item';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.page.html',
  styleUrls: ['./create-edit.page.scss'],
})
export class CreateEditPage implements OnInit {

  item: Item = new Item();

  constructor(private $camera: Camera, private $itemService: ItemService, private $router: Router) { }

  ngOnInit() { }

  makeFoto() {
    this.$camera.getPicture(
      {
        quality: 35,
        destinationType: this.$camera.DestinationType.DATA_URL,
        encodingType: this.$camera.EncodingType.JPEG,
        mediaType: this.$camera.MediaType.PICTURE
      }
    ).then((imageData) => {
      this.item.Image = 'data:image/jpeg:base64,' + imageData;
    });
  }

  save() {
    this.$itemService.add(this.item);
    this.$router.navigate(['tabs/overview'])
  }

}
