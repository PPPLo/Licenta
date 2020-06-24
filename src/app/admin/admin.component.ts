import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';
import { map, switchMap } from 'rxjs/operators';
import { OrdersService } from '../orders/orders.service';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';

const newOrderDescription :string = "În pregătire";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  admin:any;
  user:any;
  newOrders:any[];

  viewOrdersFlag:boolean=true;
  orderKey:string;

  subAdmin:Subscription;
  subOrders:Subscription;
  

  constructor(private loginService:LoginService,
              private ordersService: OrdersService,
              private userService: UsersService,
              private route: Router) { }

  ngOnInit(): void {

    this.userService.getUserById("TMnCH4JmraU8Bh55OXRMut8WEnH3").subscribe(user=>
      {this.user=user;
      console.log(this.user, "user cu id");})

    this.subAdmin=this.loginService.getCurrentUser()
    .pipe(
      switchMap(user=>{
        if(!user) return 'e';
          return  this.loginService.getCurrentUserDb();
      }),
      map(user=>user)
    )
    .subscribe(user=>{
      if(user!='e' && user.isAdmin) {this.admin=user;
      }
      else
      this.admin=null;     
    },erreur=> console.log); 

    this.subOrders=this.ordersService.getOrdersByStatus(newOrderDescription).subscribe(orders=>
      {
      this.newOrders=orders;

      this.userService.getUserById(this.newOrders[2].userId).subscribe(user=>
        {this.user=user;
        console.log(this.user, "user cu id");})

        this.userService.getUserById(this.newOrders[0].userId).subscribe(
          user=>console.log(user)
        )
        });
      /*this.newOrders.forEach(order=> {
          this.userService.getUserById(order.userId).subscribe(user=> {order.delivery=user;
         }
          )})}*/
        
  }

  toggleLink(orderKey){
    this.viewOrdersFlag=!this.viewOrdersFlag;
    this.orderKey=orderKey;
  }

  onSignOut(){
    this.loginService.signOut();
    this.route.navigate(['/welcome']);
  }

  ngOnDestroy(): void {
    this.subAdmin.unsubscribe();
    this.subOrders.unsubscribe();
  }

}
