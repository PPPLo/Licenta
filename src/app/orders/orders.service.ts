import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private db:AngularFireDatabase) { }

  createOrder(order)
  {
   return this.db.list('/orders').push(order);
  }

  getOrders(userId:string){
    console.log(userId);
    return this.db.list('orders', list => list.orderByChild("userId").equalTo(userId)).snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...(c.payload.val() as any)}))));
  }

  getOrdersMapItems(userId:string){
    console.log(userId);
    return this.db.list('orders', list => list.orderByChild("userId").equalTo(userId)).snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...(c.payload.val() as any).items}))));
  }


}
