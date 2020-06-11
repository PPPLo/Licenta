import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';
import {Subscriber, Subscription} from 'rxjs';
import {mergeMap, map} from 'rxjs/operators';
import { ProductService } from '../product-service/product.service';
import { CollectionsService } from '../product-service/collections.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit {

  products:any[];
  collections: any[];

  constructor(private productService:ProductService,
              private collectionsService:CollectionsService) { }

  ngOnInit(): void {

    this.collectionsService.getAllCollections().pipe
    (mergeMap(collections=>this.productService.getProducts().pipe
    (map(products=>[collections,products])))).subscribe(([collections,products])=>{
      this.products=products;
      this.collections=this.collections; 
      console.log(products);
      console.log(collections);
    })
  }

  getProductsByCollections(key){
    return this.products.filter(products=>products.collections==key);

  /*
  getProductsByCategory(key){
    return this.products.filter(products=>products.category==key);
  }
 
  }
  getProductsBySize(key){
    return this.products.filter(products=>{
    if (key=='mini'){
      products.size == 8;
    }
    else if (key=='small'){
      products.size == 12;
    }
    else if (key=='medium'){
      products.size == 12;
    }
    else if(key=='large'){}
  }
  );
}*/
}
}