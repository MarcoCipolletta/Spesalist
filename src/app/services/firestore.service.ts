import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { iItem } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    private firestore: Firestore,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  listenToItems() {
    const colRef = collection(this.firestore, 'items');
    return collectionData(colRef, { idField: 'id' }) as Observable<iItem[]>;
  }

  addItem(item: Partial<iItem>) {
    try {
      addDoc(collection(this.firestore, 'items'), item).then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  deleteItem(id: string) {
    try {
      deleteDoc(doc(this.firestore, `items/${id}`)).then(() => {
        console.log('Document successfully deleted!');
      });
    } catch (e) {
      console.error('Error removing document: ', e);
    }
  }

  updateItem(item: iItem) {
    item.checked = !item.checked;
    try {
      updateDoc(doc(this.firestore, `items/${item.id}`), { ...item }).then(
        () => {}
      );
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  }
}
