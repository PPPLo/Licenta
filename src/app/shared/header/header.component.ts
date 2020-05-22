import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon"; 
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private matIconRegistry : MatIconRegistry,
    private domSanitizer: DomSanitizer) {
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
