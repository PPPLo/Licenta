import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product-service/product.service';
import { ViewEncapsulation} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ProductDetailComponent implements OnInit {
  selected:any;
  product:any;
  retrieved_product:any;
  careinstructions:string[];
  products:any[];
  currentImageUrl:string;
  productspecs: string[];
  sub: Subscription;

  constructor(private route: ActivatedRoute,
    private productService:ProductService) {
   }

  showImage(urlImage){
    this.currentImageUrl=urlImage;
  }

  ngOnInit(): void {

    let name = this.route.snapshot.paramMap.get('name');
    console.log(name);

    this.sub=this.productService.getProduct(name).subscribe({next:product=>{
      console.log(product);
      this.product=product[0];
      this.currentImageUrl=this.product.urlImage1;
      this.careinstructions=this.product.careinstructions.split("\n", 4);
      this.productspecs=this.product.productspecs.split("\n");
      console.log(this.sub);
    }}); 
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
