import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './header/search/search.component';
import { AccountComponent } from './header/account/account.component';
import { CartComponent } from './header/cart/cart.component';
import { CustomerServiceComponent } from './footer/customer-service/customer-service.component';

import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatBadgeModule } from "@angular/material/badge";
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    AccountComponent,
    CartComponent,
    CustomerServiceComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule,
    MatBadgeModule,
    TooltipModule,
    BsDropdownModule,
    BrowserAnimationsModule,
    RouterModule,
    NgbModule

  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    AccountComponent,
    CartComponent,
    CustomerServiceComponent,
    MatIconModule,
    HttpClientModule,
    MatBadgeModule,
    BsDropdownModule,
  ]
})
export class SharedModule { }
