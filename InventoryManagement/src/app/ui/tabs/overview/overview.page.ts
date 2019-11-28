import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/core/item.service';
import { UtilService } from 'src/app/core/util.service';
import { Item } from 'src/app/shared/model/item';
import { AlertService } from 'src/app/core/alert.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
/**
 * @Author Danijel Malinovic
 */
export class OverviewPage implements OnInit {
  items: Item[] = [];

  constructor(private $itemService: ItemService, private $utilService: UtilService, private $alertService: AlertService) { }

  async ngOnInit() {
    this.items = this.$itemService.Items;
  }

  async delete(item: Item) {
    await this.$alertService.confirm('Wollen sie wirklich diesen Datensatz löschen?', () => {
      this.$itemService.delete(item);
      this.items = this.$itemService.Items;
    });
  }
}
