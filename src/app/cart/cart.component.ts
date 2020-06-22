import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  user:firebase.User;
  productsInCart:any[];
  cartSub :Subscription;
  cartItemsNumber: number;
  totalPrice: number;
  transportPrice: number;
  
  displayedColumns: string[] = ['product', 'name', 'quantity', 'price'];

  constructor( private cartService: CartService,
    private route:Router) { }

  getTotalPrice(){
    this.totalPrice=0;
    this.productsInCart.forEach(product=>{
      this.totalPrice=this.totalPrice + product.price*product.itemsnumber;
    })
    return this.totalPrice;
  }

  getTransportPrice(){
    this.transportPrice=0;
    this.productsInCart.forEach(product=>{
      this.transportPrice= (this.totalPrice>200)?0:20;
    })
    return this.transportPrice;
  }

  getFinalPrice(){
    return this.transportPrice+this.totalPrice;
  }

  onContinueShopping(){
    this.route.navigate(['/welcome']);
  }
  onCheckoutCart(){
    this.route.navigate(['/orders']);
  }

  onChange(value,product)
  {
    console.log(value);
    console.log(product);
    this.cartService.updateNrOfItems(product,value);
  }

  onDelete(product){
    console.log('on delete');
    this.cartService.deleteProductFromShoppingCart(product.key);
  }

  ngOnInit(): void {
    this.cartSub=this.cartService.getListItemsShoppingCartMapProducts().subscribe(products=>{
      this.productsInCart=products;
      this.cartItemsNumber=0;
      for (var i=0; i < products.length; i++ ){
        this.cartItemsNumber+=parseInt(products[i].itemsnumber);
      }})
  }
}
