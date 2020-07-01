import { Component, OnInit, OnChanges, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  relatedProducts:any[];

  careinstructions:string[];
  nrOfItems:number;
  currentImageUrl:string;
  productspecs: string[];
  reviews: any[];
  key:any;

  productSub: Subscription;
  relatedSub: Subscription;
  reviewSub: Subscription;

  param:string;
  link: string="Reviews";

  constructor(private activatedRoute: ActivatedRoute,
    private productService:ProductService,
    private cartService: CartService,
    private route:Router) {
   }

  showImage(urlImage){
    this.currentImageUrl=urlImage;
  }

  addProductToCart(product,quantity){
    this.cartService.addToCart(product,quantity);
   
  }

  onChange(productName, param){
    this.productSub.unsubscribe();
    this.relatedSub.unsubscribe();

    this.relatedSub=this.productService.getSuggestedProducts(this.param).subscribe(products=>
      {this.relatedProducts=products
      console.log(this.relatedProducts);});

    this.productSub=this.productService.getProduct(productName).subscribe({next:product=>{
      this.product=product[0];
      this.currentImageUrl=this.product.urlImage1;
      this.careinstructions=this.product.careinstructions.split("\n", 4);
      this.productspecs=this.product.productspecs.split("\n");
    }});
    this.route.navigate(['/products/p', productName, param]);
  }

  ngOnInit(): void {

    let name = this.activatedRoute.snapshot.paramMap.get('name');
    this.param= this.activatedRoute.snapshot.paramMap.get('option');

    if (this.param=="") this.param="all";
    
    this.relatedSub=this.productService.getSuggestedProducts(this.param).subscribe(products=>
      {
        this.relatedProducts=products;
      });

    this.productSub=this.productService.getProduct(name).subscribe({next:product=>{
      this.product=product[0];
      this.key=product[0].key;
      this.currentImageUrl=this.product.urlImage1;
      this.careinstructions=this.product.careinstructions.split("\n", 4);
      this.productspecs=this.product.productspecs.split("\n");

      this.reviewSub=this.productService.getProductReviews(this.key).subscribe(reviews=>
        {this.reviews=reviews;
          console.log(reviews, "this they are");
        });
    }}); 

    
  }

  ngOnDestroy(){
    this.productSub.unsubscribe();
    this.relatedSub.unsubscribe();
    this.reviewSub.unsubscribe();
    
  }
}
