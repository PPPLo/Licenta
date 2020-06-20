import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon"; 
import { DomSanitizer } from "@angular/platform-browser";
import { ProductService } from 'src/app/product/product-service/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit,OnDestroy {

  products:any[8];
  sub: Subscription;


  constructor(private matIconRegistry : MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private productService:ProductService) { 
      this.matIconRegistry.addSvgIcon(
        "box-icon",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/FooterIcons/box.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "plant-pot-icon",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/FooterIcons/plant-pot.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "cactus-icon",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/FooterIcons/cactus.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "growth-icon",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/FooterIcons/growth.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "gardening-icon",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/FooterIcons/gardening.svg")
      );
      }

  ngOnInit(): void {
    this.sub=this.productService.getNewInProducts().subscribe({next:products=>{
      this.products=products;
    }})
  } 

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
