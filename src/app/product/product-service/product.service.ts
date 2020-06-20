import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  option:string;
  
  constructor(private db:AngularFireDatabase) {        
  }

  getNewInProducts(){
    return this.db.list('products', list=>list.limitToLast(8)).snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...c.payload.val() as {}})
    )))
  }

  getProduct( name : string){
    return this.db.list('products',list => list.orderByChild("name").equalTo(name)).snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...c.payload.val() as {}})
    )))
  }

  getProductsByNameSearch(){
    return this.db.list('products').snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...c.payload.val() as {}})
    )))
  }

  getFilteredProductsByOptionFlag(option : string){
    if (option === "all")
    {
      return this.db.list('products').snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...c.payload.val() as {}}))));
    }
    else if (option === "airpurifying" || 
             option === "easycare" ||
             option === "lowlight" ||
             option === "vining" ||
             option === "petfriendly")
    {
      return this.db.list('products', list => list.orderByChild(option).equalTo('yes')).snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...c.payload.val() as {}}))));
    }
    else if (option === "hoya" || 
             option === "peperomia" ||
             option === "philodendron" ||
             option === "pothos" ||
             option === "sanseveria"||
             option === "calathea" || 
             option === "palm" ||
             option === "succulent" ||
             option === "flowering" )
    {
      return this.db.list('products', list => list.orderByChild("family").equalTo(option)).snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...c.payload.val() as {}}))));
    }
    else if (option === "large" || 
            option === "medium" ||
            option === "small"  ||
            option === "mini" )
    {
      return this.db.list('products', list => list.orderByChild("size").equalTo(option)).snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...c.payload.val() as {}}))));
    }
  }
}
