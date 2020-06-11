import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  getProducts(){
    return this.db.list('products').snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...c.payload.val() as {}})
    )))
  }
}
