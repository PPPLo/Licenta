import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

import { AngularUiModule } from '../shared/angularmaterial/angular-ui.module';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    ProductListComponent, 
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularUiModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  exports:[
    ProductDetailComponent,
    ProductListComponent,
    CommonModule,
  ],
  providers: []
})
export class ProductModule { }
