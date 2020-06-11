import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon"; 
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {

  constructor(private matIconRegistry : MatIconRegistry,
    private domSanitizer: DomSanitizer) { 
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
  }

}
