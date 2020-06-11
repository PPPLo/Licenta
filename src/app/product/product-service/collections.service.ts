import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  constructor(private db:AngularFireDatabase) {}
  getAllCollections(){
    return this.db.list('collections').snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...c.payload.val() as {}})
    )))
   }
}
