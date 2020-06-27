import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  user:firebase.User;
  productsInCart:any[];
  emptyCartFlag: boolean=true;
  cartSub :Subscription;
  loginSub: Subscription;

  cartItemsNumber: number;
  totalPrice: number;
  transportPrice: number;
  
  displayedColumns: string[] = ['product', 'name', 'quantity', 'price'];


  constructor( private cartService: CartService,
                private route:Router,
                private loginService: LoginService) { }

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

  onChange(value,product)
  {
    this.cartService.updateNrOfItems(product,value);
  }

  onDelete(product){
    this.cartService.deleteProductFromShoppingCart(product.key);
  }

  ngOnInit(): void {
    this.loginSub=this.loginService.getCurrentUser().subscribe(user=>{this.user=user; console.log(this.user)});
    this.cartSub=this.cartService.getListItemsShoppingCartMapProducts().subscribe(products=>{
      if(!products) this.emptyCartFlag=true;
      else{ 
      this.productsInCart=products;
      this.cartItemsNumber=0;
      for (var i=0; i < products.length; i++ ){
        this.cartItemsNumber+=parseInt(products[i].itemsnumber);
        this.emptyCartFlag=false;
      }
      }})
    
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
    this.cartSub.unsubscribe();
  }
}
