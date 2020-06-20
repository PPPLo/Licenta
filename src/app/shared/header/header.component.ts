import { Component, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon"; 
import { DomSanitizer } from "@angular/platform-browser";
import { EventEmitter } from 'protractor';
import { ProductService } from 'src/app/product/product-service/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private matIconRegistry : MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private productService: ProductService) {
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

  ngOnInit(): void {
  }

}
