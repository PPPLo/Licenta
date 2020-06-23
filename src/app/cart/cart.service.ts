import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import { take, map } from 'rxjs/operators';
import { Key } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private db:AngularFireDatabase) { }

  async addToCart(product, quantity){
    let cartId=localStorage.getItem('cartId');
    if(!cartId)
    {
     let cart= await this.db.list('/shoppingCart').push({
        dateCreated:new Date().getTime()
      });
      localStorage.setItem('cartId',cart.key)
      this.addProductToCart(cart.key,product, quantity)
    }
    else
    {
      this.addProductToCart(localStorage.getItem('cartId'),product, quantity);
    }
  }

  addProductToCart(cartId, productToAdd, quantity){
    console.log('addProduct',productToAdd);
    this.db.object('/shoppingCart/'+cartId+'/items/'+productToAdd.key).snapshotChanges().pipe(take(1)).subscribe(
              productCart=>{console.log(productCart);
                            if(!productCart.key)
                            {
                              this.db.list('/shoppingCart/'+cartId+'/items/').set(productToAdd.key, {product:productToAdd});
                              this.db.object('/shoppingCart/'+cartId+'/items/' + productToAdd.key + '/product').update({itemsnumber:quantity});
                            }
                            else{
                              this.db.object('/shoppingCart/'+cartId+'/items/' + productToAdd.key + '/product').update({itemsnumber:quantity});
                            }
                          })
    }

    updateNrOfItems(product,numberOfItems)
    {
      this.db.object('/shoppingCart/'+localStorage.getItem('cartId')+'/items/' + product.key + '/product').update({itemsnumber:numberOfItems});
    }

    getListItemsShoppingCart()
    {
      let cartId=localStorage.getItem('cartId');
      return this.db.list('/shoppingCart/'+cartId+'/items/').snapshotChanges().pipe(map(
         products =>products.map(c => (
                             {                            
                               key: c.payload.key, ...c.payload.val() as {} 
                             }
                             ))))  
    }

    getListItemsShoppingCartMapProducts()
    {
      let cartId=localStorage.getItem('cartId');
      return this.db.list('/shoppingCart/'+cartId+'/items/')
              .snapshotChanges()
              .pipe(
                 map(products =>
                        products.map(p => (
                             {                               
                               key: p.payload.key, ...(p.payload.val() as any).product
                             }
                             ))))
    }

    deleteProductFromShoppingCart(id:string){
      let cartId=localStorage.getItem('cartId');
      return this.db.object('/shoppingCart/'+cartId+'/items/'+id).remove();
    }

    clearShpoppingCart()
    {
      let cartId=localStorage.getItem('cartId');
      this.db.object('/shoppingCart/'+cartId+'/items/').remove();
    }
  }

