import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/core/item.service';
import { UtilService } from 'src/app/core/util.service';
import { Item } from 'src/app/shared/model/item';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {
  items: Item[] = [];

  constructor(private $itemService: ItemService, private $utilService: UtilService) { }

  async ngOnInit() {
    this.items = this.$itemService.Items;
  }
}
