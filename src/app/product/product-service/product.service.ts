import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { map, take } from 'rxjs/operators';
import { IProduct, IReview } from '../product-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  option:string;
  
  constructor(public db:AngularFireDatabase) {        
  }

  getNewInProducts(): Observable<IProduct[]>{
    return this.db.list('products', list=>list.limitToLast(8)).snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...c.payload.val() as IProduct})
    )))
  }

  getProduct( name : string){
    return this.db.list('products',list => list.orderByChild("name").equalTo(name)).snapshotChanges().pipe(take(1), map(change=>change.map(c=>({key:c.payload.key, ...c.payload.val() as IProduct})
    )))
  }

  getProductReviews( productId : string)
  {
    return this.db.list('/products/'+productId+'/reviews/')
            .snapshotChanges()
            .pipe(
               map(products =>
                      products.map(p => (
                           {                               
                             key: p.payload.key, ...(p.payload.val() as IReview)
                           }
                           ))))
  }

  getAllProducts(){
    return this.db.list('products').snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...c.payload.val() as IProduct})
    )))
  }

  getNextProducts(option:string, startAt: string, itemsPerPage:number){
    if (option === "all")
    {
      return this.db.list('products', list=>list.orderByKey().startAt(startAt).limitToFirst(itemsPerPage)).snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...c.payload.val() as IProduct}))));
    }
  }

  getAllProductsGroup( itemsPerPage:number, startAt:number){
    return this.db.list('products', list=>list.orderByKey().startAt(startAt.toString()).limitToFirst(itemsPerPage)).snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...c.payload.val() as IProduct}))));
  }

  getFilteredProductsByOptionFlag(option : string){
    if (option === "all")
    {    
    }
    else if (option === "airpurifying" || 
             option === "easycare" ||
             option === "lowlight" ||
             option === "vining" ||
             option === "petfriendly")
    {
      return this.db.list('products', list => list.orderByChild(option).equalTo('yes')).snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...c.payload.val() as IProduct}))));
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
      return this.db.list('products', list => list.orderByChild("family").equalTo(option)).snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...c.payload.val() as IProduct}))));
    }
    else if (option === "large" || 
            option === "medium" ||
            option === "small"  ||
            option === "mini" )
    {
      return this.db.list('products', list => list.orderByChild("size").equalTo(option)).snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...c.payload.val() as IProduct}))));
    }
  }

  getSuggestedProducts(option : string){
    if (option === "all")
    {
      return this.db.list('products',  list=>list.limitToLast(4)).snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...c.payload.val() as IProduct}))));
    }
    else if (option === "airpurifying" || 
             option === "easycare" ||
             option === "lowlight" ||
             option === "vining" ||
             option === "petfriendly")
    {
      return this.db.list('products', list => list.orderByChild(option).equalTo('yes').limitToLast(4)).snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...c.payload.val() as IProduct }))));
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
      return this.db.list('products', list => list.orderByChild("family").equalTo(option).limitToLast(4)).snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...c.payload.val() as IProduct}))));
    }
    else if (option === "large" || 
            option === "medium" ||
            option === "small"  ||
            option === "mini" )
    {
      return this.db.list('products', list => list.orderByChild("size").equalTo(option).limitToLast(4)).snapshotChanges().pipe(map(change=>change.map(c=>({key:c.payload.key, ...c.payload.val() as IProduct}))));
    }
  }

  addProductReview(productId : string, name:string,  review: {
                                                              dateCreated:string,
                                                              userFirstname:string,
                                                              userLastname:string,
                                                              userKey:string,
                                                              rating:number,
                                                              comment:string
                                                              } )
  {   
    this.getProduct(name).subscribe(product=> 
      {  
        let productDb : any = product[0];

        if (!productDb.totalScore) {

          this.db.object('/products/' + productId ).update({reviewCount:1, totalScore:review.rating});
        }
        else{
          let newReviewCount = productDb.reviewCount+1;
          let totalScore: number = (productDb.totalScore*productDb.reviewCount+review.rating)/newReviewCount;
      
          this.db.object('/products/' + productId ).update({reviewCount:newReviewCount, totalScore:totalScore});

      }})
      this.db.list('/products/' + productId + '/reviews').push(review).key;
    }
    
}
