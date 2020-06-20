import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CustomerServiceComponent } from './footer/customer-service/customer-service.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularUiModule } from './angularmaterial/angular-ui.module';
import { AppRoutingModule } from '../app-routing.module';
import { RatingComponent } from './rating/rating.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CustomerServiceComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BsDropdownModule,
    BrowserAnimationsModule,
    NgbModule,
    AngularUiModule,
    AppRoutingModule

  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    CustomerServiceComponent,
    HttpClientModule,
    BsDropdownModule,
    AngularUiModule,
    RatingComponent 
  ]
})
export class SharedModule { }
