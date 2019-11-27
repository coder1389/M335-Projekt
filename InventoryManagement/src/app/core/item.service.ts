import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from '../shared/model/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private $db: AngularFirestore) { }

  get Items() {
    let items = [];

    this.$db.collection<Item>('items').snapshotChanges().subscribe(serverItems => {
      serverItems.forEach(a => {
        let item: any = a.payload.doc.data();
        item.Id = a.payload.doc.id;
        items.push(item)
      })
    })

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
    console.log(item)
    this.$db.doc(`items/${item.Id}`).delete();
  }
}
