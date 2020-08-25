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
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { SwiperComponent } from './swiper/plants-we-love/swiper.component';
import { RatingDialogComponent } from './rating/rating-dialog/rating-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';
import { SwiperDetailComponent } from './swiper/swiper-detail/swiper-detail.component';
import { SuggestedSwiperComponent } from './swiper/suggested-swiper/suggested-swiper.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CustomerServiceComponent,
    RatingComponent,
    SwiperComponent,
    RatingDialogComponent,
    CartDialogComponent,
    SwiperDetailComponent,
    SuggestedSwiperComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BsDropdownModule,
    BrowserAnimationsModule,
    NgbModule,
    AngularUiModule,
    AppRoutingModule,
    NgxUsefulSwiperModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    CustomerServiceComponent,
    HttpClientModule,
    BsDropdownModule,
    AngularUiModule,
    RatingComponent,
    NgxUsefulSwiperModule,
    SwiperComponent,
    SwiperDetailComponent,
    SuggestedSwiperComponent
  ]
})
export class SharedModule { }
