import { Component, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon"; 
import { DomSanitizer } from "@angular/platform-browser";
import { EventEmitter } from 'protractor';
import { ProductService } from 'src/app/product/product-service/product.service';
import { LoginService } from 'src/app/login/login.service';
import { FirebaseApp } from '@angular/fire';
import { CartService } from 'src/app/cart/cart.service';
import { Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    user:any;
    cartItemsNumber:number = 0;
    cartItemsProducts:any[];

    cartSub :Subscription;
    loginSub : Subscription;

    toggleNavbar:any;

    constructor(private matIconRegistry : MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private productService: ProductService,
    private loginService: LoginService,
    private cartService: CartService) {
    this.matIconRegistry.addSvgIcon(
      "user-icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/Icons/user-icon.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "cart-icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/Icons/cart-icon.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "search-icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/Icons/search-icon.svg")
    );
   }

   logout(){
     this.loginService.signOut();
   }

  ngOnInit(): void {
    this.loginSub=this.loginService.getCurrentUser()
    .pipe(
      switchMap(user=>{
        if(!user) return 'e';
          return  this.loginService.getCurrentUserDb();
      }),
      map(user=>user)
    )
    .subscribe(user=>{
      console.log(user);
      if(user!='e' ) {this.user=user;
      }
      else
      this.user=null;     
    },erreur=> console.log);
    
    
    this.cartSub=this.cartService.getListItemsShoppingCartMapProducts().subscribe(products=>{
      this.cartItemsNumber=0;
      for (var i=0; i < products.length; i++ ){
        this.cartItemsNumber+=parseInt(products[i].itemsnumber);
      }
      })
  }

  ngOnDestroy():void{
    this.loginSub.unsubscribe();
    this.cartSub.unsubscribe();
  }
}
