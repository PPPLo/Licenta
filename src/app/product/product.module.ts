import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ProductListComponent, 
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports:[
    ProductDetailComponent,
    ProductListComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
