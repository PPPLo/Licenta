import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from '../product';
import {Subscriber, Subscription, Observable} from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { ProductService } from '../product-service/product.service';
import { analytics } from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
   
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit {

  products:any[];
  filteredProducts:any[];
  filteredProductsCopy:any[];

  rowHeight:number;
  nrOfItems: number;
  

  sortFlag:boolean=false;

  sortOption :string ="atoz";
  priceOption: string;

  paramOption :Subscription;
  productListChanges: Subscription;
  category : string;
  
  constructor(private productService:ProductService,
              private route: ActivatedRoute,
              private router: Router) { }
 
  ngOnInit(): void {
    
    this.paramOption=this.route.params.subscribe(
         (params) => {
          this.category=this.translateParam(params.option);
          this.productListChanges=this.productService.getFilteredProductsByOptionFlag(params.option).subscribe({next:products=>{
                                  this.filteredProducts = products;         
                                  this.nrOfItems = this.filteredProducts.length;
                                  this.rowHeight = Math.ceil(this.nrOfItems/3)*290;
          }
        });
      }
    );     
  }

  translateParam(option){
    if (option=="all") return "Toate plantele"
    if (option=="vining") return "Plante curgătoare"
    if (option=="airpurifying") return "Plante purificatoare de aer"
    if (option=="lowlight") return "Plante pentru lumină redusă"
    if (option=="easycare") return "Toate ușor de îngrijit"
    if (option=="petfriendly") return "Plante sigure pentru animale"
    if (option=="hoya") return "Hoya"
    if (option=="peperomia") return "Peperomia"
    if (option=="philodendron") return "Philodendron"
    if (option=="pothos") return "Pothos"
    if (option=="sanseveria") return "Sanseveria"
    if (option=="calathea") return "Calathea"
    if (option=="palm") return "Palmieri"
    if (option=="flowering") return "Plante cu flori"
    if (option=="large") return "Plante mari"
    if (option=="medium") return "Plante medii"
    if (option=="small") return "Plante mici"
    if (option=="mini") return "Plante mini"

  }

  onClickToHome(){
    this.router.navigate(['/welcome']);
  }

  sortProducts(){

    console.log("sort by first");
    if (this.sortOption=="atoz")
    {
    this.filteredProducts.sort((a,b) => a.name.localeCompare(b.name));
    }
    if (this.sortOption=="ztoa")
    {
    this.filteredProducts.sort((a,b) => b.name.localeCompare(a.name));
    }
    if (this.sortOption=="ascending")
    {
    this.filteredProducts.sort((a,b) => a.price-b.price);
    }
    if (this.sortOption=="descending")
    {
    this.filteredProducts.sort((a,b) => b.price-a.price);
    }


  }

  sortProductsByPrice(){
    console.log("sort by price");

    if(!this.sortFlag){
      this.filteredProductsCopy=this.filteredProducts;
      this.sortFlag=true;
    }

    this.filteredProducts=this.filteredProductsCopy;
    this.sortProducts();

    if (this.priceOption=="1"){
      
      this.filteredProducts = this.filteredProducts.filter((product:any) => product.price<50);
    }
    if (this.priceOption=="2"){
      this.filteredProducts = this.filteredProducts.filter((product:any) => product.price>50 && product.price<100);
      
    }
    if (this.priceOption=="3"){
      this.filteredProducts = this.filteredProducts.filter((product:any) => product.price>100 && product.price<200);
    }
    if (this.priceOption=="4"){
      this.filteredProducts = this.filteredProducts.filter((product:any) => product.price>200 );
    }
    console.log(this.priceOption);

  }

  ngOnDestroy(): void {
    this.paramOption.unsubscribe();
    this.productListChanges.unsubscribe();
    console.log("unsubscribed");
  } 
}    

  

