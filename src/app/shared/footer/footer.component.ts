import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  checkRoute: boolean;

  constructor(private matIconRegistry : MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router) {
      this.matIconRegistry.addSvgIcon(
        "facebook-icon",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/Icons/facebook.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "twitter-icon",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/Icons/twitter.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "instagram-icon",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/Icons/instagram.svg")
      );
      router.events.subscribe(url=>this.checkRoute=this.router.url === '/welcome');
      
     }

  ngOnInit(): void {
  }
}
