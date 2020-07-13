import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

import { AngularUiModule } from '../shared/angularmaterial/angular-ui.module';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductSearchComponent } from './product-search/product-search.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ProductListComponent, 
    ProductDetailComponent, 
    ProductSearchComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularUiModule,
    AppRoutingModule,
    FlexLayoutModule,
    SharedModule,
    FormsModule,
    NgbModule
  ],
  exports:[
    ProductDetailComponent,
    ProductListComponent,
    CommonModule,
    NgbModule
  ],
  providers: []
})
export class ProductModule { }
