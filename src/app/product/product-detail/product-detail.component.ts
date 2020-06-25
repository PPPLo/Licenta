import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product-service/product.service';
import { ViewEncapsulation} from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ProductDetailComponent implements OnInit {
  product:any;
  products:any[];
  retrieved_product:any;

  careinstructions:string[];
  nrOfItems:number;
  currentImageUrl:string;
  productspecs: string[];

  productSub: Subscription;
 

  constructor(private route: ActivatedRoute,
    private productService:ProductService,
    private cartService: CartService) {
   }

  showImage(urlImage){
    this.currentImageUrl=urlImage;
  }

  addProductToCart(product,quantity){
    this.cartService.addToCart(product,quantity);
  }

  ngOnInit(): void {

    let name = this.route.snapshot.paramMap.get('name');

    this.productSub=this.productService.getProduct(name).subscribe({next:product=>{
      this.product=product[0];
      this.currentImageUrl=this.product.urlImage1;
      this.careinstructions=this.product.careinstructions.split("\n", 4);
      this.productspecs=this.product.productspecs.split("\n");

    }}); 
  }

  ngOnDestroy(){
    this.productSub.unsubscribe();
  }
}
