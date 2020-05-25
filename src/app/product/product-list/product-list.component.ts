import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  private products: IProduct[];
  errorMessage: string;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    console.log('yuuu');
    this.productService.getProducts().subscribe({
      next:products => {this.products = products 
      },
      error: err =>this.errorMessage = err
       });

  }
}
