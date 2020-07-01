import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { ProductListComponent} from "./product/product-list/product-list.component";
import { ProductDetailComponent} from "./product/product-detail/product-detail.component";
import { HeaderComponent } from './shared/header/header.component';
import { CustomerServiceComponent } from './shared/footer/customer-service/customer-service.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { ProductSearchComponent } from './product/product-search/product-search.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin/admin.component';
import { AdminService } from './admin/admin.service';
import { LoginService } from './login/login.service';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersService } from './users/users.service';
import { OrderSuccessComponent } from './orders/order-success/order-success.component';

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'products/c/:option', component: ProductListComponent},
  {path: 'products/p/:name/:option', component: ProductDetailComponent},
  {path: 'search', component: ProductSearchComponent},
  {path: 'cart', component:CartComponent},
  {path: 'orders', component:OrdersComponent, canActivate:[LoginService]},
  {path: 'order-status/:status', component:OrderSuccessComponent, canActivate:[LoginService]},
  {path: 'login', component: LoginComponent },
  {path: 'admin', component: AdminComponent, canActivate:[AdminService]},
  {path: 'profile', component: UsersComponent },
  {path: 'customerservice', component: CustomerServiceComponent},
  {path:'', redirectTo:'welcome', pathMatch:'full'},
  //{path:'**', redirectTo:'welcome', pathMatch:'full'}
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

@NgModule({
  imports : [ RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
 
export class AppRoutingModule {

 }
