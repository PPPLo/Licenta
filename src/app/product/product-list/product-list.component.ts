import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, BehaviorSubject} from 'rxjs';
import { ProductService } from '../product-service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { ɵallowPreviousPlayerStylesMerge } from '@angular/animations/browser';
import { IProduct } from '../product-interface';
import { FlexAlignStyleBuilder } from '@angular/flex-layout';
   
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit, OnDestroy {

  products:any[];
  filteredProducts:IProduct[];
  filteredProductsCopy:IProduct[];
  allProducts:IProduct[];

  nrOfItems: number;
  itemsPerPage: number = 9 ;

  sortFlag:boolean=false;

  sortOption :string ="atoz";
  priceOption: string;

  paramOptionSub :Subscription;
  productListChangesSub: Subscription;
  productListLenghtSub : Subscription;
  nextSub: Subscription;
  prevSub: Subscription;

  translatedCategory : string;
  categoryParam: string;

  menuToggle:boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  isInitialized: boolean = false;
  
  constructor(private productService:ProductService,
              private route: ActivatedRoute,
              private router: Router) { }
 
  ngOnInit(): void {  

    this.paramOptionSub=this.route.params.subscribe(
         (params) => {
            if(this.isInitialized == false){
              this.isInitialized=true;
            }
            else{
              this.paginator.firstPage();
            }

            this.categoryParam=params.option;
            this.translatedCategory=this.translateParam(params.option);
            if (this.categoryParam == "all"){
                this.productListChangesSub=this.productService.getAllProductsGroup(this.itemsPerPage, 0).subscribe({next:products=>{
                this.filteredProducts = products; 
                this.sortProducts();
                }});
                this.productListLenghtSub=this.productService.getAllProducts().subscribe(products=>{
                this.nrOfItems=products.length;
                });
            }
            else{
              this.productListChangesSub=this.productService.getFilteredProductsByOptionFlag(this.categoryParam).subscribe({next:products=>{
              this.filteredProducts = products; 
              this.nrOfItems=products.length;
              this.sortProducts();
              this.allProducts=this.filteredProducts;
              if (this.nrOfItems > this.itemsPerPage){
                  this.filteredProducts = this.allProducts.slice(0,this.itemsPerPage);              
              }
              else{
                this.filteredProducts = this.allProducts;
              }             
              }});
          }                  
      }
    );
  }


  onClickToHome(){
    this.router.navigate(['/welcome']);
  }

  handlePage(event? : PageEvent){
    console.log(event.pageIndex);

    if (this.categoryParam == "all"){
        this.nextSub=this.productService.getNextProducts(this.categoryParam, (event.pageIndex*this.itemsPerPage).toString(), this.itemsPerPage).subscribe(products=>
        {
          this.filteredProducts=products;
          this.sortProducts();
        });
    }
    else{
      this.filteredProducts=this.allProducts.slice(event.pageIndex*this.itemsPerPage, (event.pageIndex+1)*this.itemsPerPage);
    }
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

  sortProducts(){
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
    this.nrOfItems = this.filteredProducts.length;
    console.log(this.priceOption);
  }

  ngOnDestroy(): void {
    this.paramOptionSub.unsubscribe();
    this.productListChangesSub.unsubscribe();
  } 

  onDisplayClick(){
    const element = document.getElementById('toggle-menu');
    console.log("clicked");
    this.menuToggle=!this.menuToggle;
    console.log(this.menuToggle);
    if (this.menuToggle==true) {
      element.style.display = "block";
      console.log(true);
    }
    else {
      element.style.display = "none";
      console.log(false);
    }
  }
}    

  

