import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { ProductListComponent} from "./product/product-list/product-list.component";
import { ProductDetailComponent} from "./product/product-detail/product-detail.component";
import { HeaderComponent } from './shared/header/header.component';
import { AccountComponent } from './shared/header/account/account.component';
import { CartComponent } from './shared/header/cart/cart.component';
import { CustomerServiceComponent } from './shared/footer/customer-service/customer-service.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { ProductSearchComponent } from './product/product-search/product-search.component';

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'products/c/:option', component: ProductListComponent},
  {path: 'products/p/:name', component: ProductDetailComponent},
  {path: 'search', component: ProductSearchComponent},
  {path: 'cart', component:CartComponent},
  {path: 'login', component: AccountComponent},
  {path: 'customerservice', component: CustomerServiceComponent},
  {path:'', redirectTo:'welcome', pathMatch:'full'},
  //{path:'**', redirectTo:'welcome', pathMatch:'full'}
];

@NgModule({
  imports : [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
 
export class AppRoutingModule {

 }
