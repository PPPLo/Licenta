import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product-service/product.service';
import { ViewEncapsulation} from '@angular/core';

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
  products:any[];
  currentImageUrl:string;

  constructor(private route: ActivatedRoute,
    private productService:ProductService) {
   }

  showImage(urlImage){
    this.currentImageUrl=urlImage;
  }

 /* onNotify(rating:number):void {
       
    this.product.rating = rating;
  }
  */
  ngOnInit(): void {

    let name = this.route.snapshot.paramMap.get('name');

    this.productService.getProducts().subscribe({next:products=>{
      this.products = products; 
      this.product = this.products.filter(products=>products.name==name)[0];
      this.retrieved_product=this.product;
      this.currentImageUrl=this.product.urlImage1;
    }});
    console.log(name);
    
  }
}
