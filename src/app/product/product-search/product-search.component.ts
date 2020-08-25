import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  products: any[];
  filteredProducts:any[];
  sub:Subscription;

   _listFilter :string;
  get listFilter(): string {
      return this._listFilter;
  }
  set listFilter(value:string){
      this._listFilter=value;
      this.filteredProducts=this.listFilter ? this.performFilter(this.listFilter):[];
  }

  constructor(private productService:ProductService) { }

  performFilter (filterBy: string): any[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product:any) => product.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
}

  ngOnInit(): void {
    this.sub=this.productService.getAllProducts().subscribe({next:products=>{
      this.products=products; 
      this.filteredProducts=[];
    }});
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
