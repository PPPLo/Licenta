import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from '../product';
import {Subscriber, Subscription, Observable} from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { ProductService } from '../product-service/product.service';
import { analytics } from 'firebase';
import { ActivatedRoute } from '@angular/router';
   
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit {

  products:any[];
  rowHeight:number;
  nrOfItems: number;
  filteredProducts:any[];
  paramOption :Subscription;
  productListChanges: Subscription;
  sortOption :string;
  priceSortOption: string;
  sizeSortOption: string;


  
  constructor(private productService:ProductService,
              private route: ActivatedRoute) { }
 
  ngOnInit(): void {
    
    this.paramOption=this.route.params.subscribe(
         (params) => {
         
          this.productListChanges=this.productService.getFilteredProductsByOptionFlag(params.option).subscribe({next:products=>{
                                  this.filteredProducts = products;         
                                  this.nrOfItems = this.filteredProducts.length;
                                  this.rowHeight = Math.ceil(this.nrOfItems/3)*290;
          }
        });
      }
    );     
  }

  ngOnChange():void{
    console.log(this.sortOption);
  }

  ngOnDestroy(): void {
    this.paramOption.unsubscribe();
    this.productListChanges.unsubscribe();
    console.log("unsubscribed");
  } 
}    
        /*this.collectionsService.getAllCollections().pipe
    (mergeMap(collections=>this.productService.getProducts().pipe
    (map(products=>[collections,products])))).subscribe(([collections,products])=>{
      this.products=products;
      this.collections=this.collections;
    })*/
  

