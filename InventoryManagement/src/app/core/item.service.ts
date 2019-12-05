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

  /**
   * Returns a subscription for items at firebase.
   */
  getItems() {
    return this.$db.collection<Item>('items').snapshotChanges();
  }

  /**
   * Adds an item to firebase
   * @param item
   */
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

  /**
   * Updates a item at firebase
   * @param item
   */
  update(item: Item) {
    this.$db.doc(`items/${item.Id}`).update(item);
  }

  /**
   * Deletes an item at firebase
   * @param item
   */
  delete(item: Item) {
    this.$db.doc(`items/${item.Id}`).delete();
  }

  /**
   * Returns a subscription from an item.s
   * @param id
   */
   get(id: string) {
    return this.$db.doc<Item>(`items/${id}`).valueChanges();
  }
}
