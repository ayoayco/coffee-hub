import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  form: FormGroup;
  constructor(
    private firestore: AngularFirestore
  ) { }


  resetForm() {
    this.form = new FormGroup({
      customerName: new FormControl(''),
      orderNumber: new FormControl(''),
      coffeeOrders: new FormControl(''),
      completed: new FormControl(false),
    });
  }

  createCoffeeOrder(data): Promise<any> {
    return this.firestore
      .collection('coffeeOrders')
      .add(data);
  }

  listCoffeeOrders() {
    return this.firestore
      .collection('coffeeOrders')
      .snapshotChanges();
  }

  markOrderAsCompleted(order) {
    return this.firestore
      .collection('coffeeOrders')
      .doc(order.payload.doc.id)
      .set({ completed: true }, { merge: true });
  }

  deleteCoffeeOrder(order) {
    return this.firestore
      .collection('coffeeOrders')
      .doc(order.payload.doc.id)
      .delete();
  }
}
