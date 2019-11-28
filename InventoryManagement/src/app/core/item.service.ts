import { Injectable, Sanitizer } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from '../shared/model/item';

@Injectable({
  providedIn: 'root'
})
/**
 * @Author Danijel Malinovic
 */
export class ItemService {
  constructor(private $db: AngularFirestore, private $sanitize: Sanitizer) { }

  get Items() {
    const items: Item[] = [];

    this.$db.collection<Item>('items').snapshotChanges().subscribe(serverItems => {
      serverItems.forEach(a => {
        const item: any = a.payload.doc.data();
        item.Id = a.payload.doc.id;
        items.push(item);

        item.Image = this.$sanitize.sanitize(null, item.Image);
      });
    });
    return items;
  }

  add(item: Item) {
    this.$db.collection('items').add({
      Name: item.Name,
      Count: item.Count,
      Image: item.Image
    });
  }

  update(item: Item) {
    this.$db.doc(`items/${item.Id}`).update(item);
  }

  delete(item: Item) {
    this.$db.doc(`items/${item.Id}`).delete();
  }
}
