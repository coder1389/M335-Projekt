import {Component, OnInit, SecurityContext} from '@angular/core';
import { ItemService } from 'src/app/core/item.service';
import { UtilService } from 'src/app/core/util.service';
import { Item } from 'src/app/shared/model/item';
import { AlertService } from 'src/app/core/alert.service';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

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

  constructor(
      private $itemService: ItemService,
      private $utilService: UtilService,
      private $alertService: AlertService,
      private $router: Router,
      private $sanitize: DomSanitizer
  ) { }

  async ngOnInit() {
    this.loadData();
  }

  /**
   * Routes to the Create/Edit page with the specific id
   * @param id
   */
  openCreateEditPage(id: number) {
    this.$router.navigate([`/../create-edit/${id}`]);
  }

  /**
   * Loads all data after initilization
   */
  private loadData() {
    this.items = [];

    this.$itemService.getItems().subscribe(serverItems => {
      this.items = [];
      serverItems.forEach(a => {
        const item: any = a.payload.doc.data();
        item.Id = a.payload.doc.id;
        this.items.push(item);

        if (item.Image !== '' || item.Image !== null) {
          item.Image = this.$sanitize.bypassSecurityTrustUrl(item.Image);
        }
      });
    });
  }

  /**
   * Deleted an element with specific id
   * @param item
   */
  async delete(item: Item) {
    await this.$alertService.confirm('Wollen sie wirklich diesen Datensatz löschen?', () => {
      this.$itemService.delete(item);
      this.loadData();
    });
  }

}
