import { Injectable, Sanitizer, SecurityContext } from '@angular/core';
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

  getItems() {
    return this.$db.collection<Item>('items').snapshotChanges();
  }

  add(item: Item) {
    if (item.Id !== '' && item.Id !== undefined) {
      this.$db.doc(`items/${item.Id}`).update(item);
    } else {
      this.$db.collection('items').add({
        Name: item.Name,
        Count: item.Count,
        Image: item.Image
      });
    }
  }

  update(item: Item) {
    this.$db.doc(`items/${item.Id}`).update(item);
  }

  delete(item: Item) {
    this.$db.doc(`items/${item.Id}`).delete();
  }

   get(id: string) {
    return this.$db.doc<Item>(`items/${id}`).valueChanges();
  }
}
