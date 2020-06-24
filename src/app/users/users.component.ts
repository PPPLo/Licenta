import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { OrdersService } from '../orders/orders.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  currentUserName: string;
  userObject: any;
  userUid: string;
  user:any;
  userOrders:any[];
  userOrderItems:any[];
  subUser: Subscription;
  subOrders: Subscription;

  viewOrdersFlag:boolean=true;
  orderKey:string;

  constructor(private login: LoginService,
              private route:Router,
              private orders:OrdersService) { }

  ngOnInit(): void {
    this.subUser=this.login.getCurrentUser()
    .pipe(
      switchMap(user=>{
        if(!user) return 'e';
        this.userUid=user.uid;
          return  this.login.getCurrentUserDb();
      }),
      map(user=>user)
    )
    .subscribe(user=>{
      if(user!='e') {this.user=user;
        this.subOrders=this.orders.getOrdersByUser(this.userUid).subscribe(orders=>
          {
          this.userOrders=orders;}); 
      }
      else
      this.user=null;
      
    },erreur=> console.log); 
  }

  toggleLink(orderKey){
    this.viewOrdersFlag=!this.viewOrdersFlag;
    this.orderKey=orderKey;
  }

  onSignOut(){
    this.login.signOut();
    this.route.navigate(['/welcome']);
  }

  ngOnDestroy(): void {
    this.subUser.unsubscribe();
    this.subOrders.unsubscribe();
  }


}
