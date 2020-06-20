import { Component, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon"; 
import { DomSanitizer } from "@angular/platform-browser";
import { EventEmitter } from 'protractor';
import { ProductService } from 'src/app/product/product-service/product.service';
import { LoginService } from 'src/app/login/login.service';
import { FirebaseApp } from '@angular/fire';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    user:firebase.User;

    constructor(private matIconRegistry : MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private productService: ProductService,
    private loginService: LoginService) {
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
    this.loginService.getCurrentUser().subscribe(user=>this.user=user)
  }

}
