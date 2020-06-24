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

  getOrdersByUser(userId:string){
    return this.db.list('orders', list => list.orderByChild("userId").equalTo(userId)).snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...(c.payload.val() as any)}))));
  }

  
  getOrdersByStatus(status:string){
    return this.db.list('orders', list => list.orderByChild("status").equalTo(status)).snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...(c.payload.val() as any)}))));
  }
}
