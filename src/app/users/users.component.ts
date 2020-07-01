import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { OrdersService } from '../orders/orders.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RatingDialogComponent } from '../shared/rating/rating-dialog/rating-dialog.component';
import { ProductService } from '../product/product-service/product.service';

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
  subProduct: Subscription;

  viewOrdersFlag:boolean=true;
  orderKey:string;

  productReview:number;
  productComment:string;
  productReviewCount:number;
  productTotalScore: number;
  reviewProduct:any;
  review : any;

  constructor(private login: LoginService,
              private route:Router,
              private orders:OrdersService,
              private serviceDialog: MatDialog,
              private productService: ProductService) { }

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
      console.log(user, "from users");
      if(user!='e') {this.user=user;
        this.subOrders=this.orders.getOrdersByUser(this.userUid).subscribe(orders=>
          {
          if(orders.length){
            this.userOrders=orders;
            console.log(this.userOrders[0].items);
          }
          else this.userOrders==null;
          
          }); 
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

  evaluateProduct(name, productId)
  {
    const dialogRef = this.serviceDialog.open(RatingDialogComponent,{
      width:'650px',
    });

     const subscribeDialog = dialogRef.componentInstance.notify.subscribe((data) => {
        this.productReview=data.rating;
        this.productComment=data.comment; 
        let i=0;
        console.log(i++, "i");
          this.review={
          dateCreated:this.calculateDate(),
          userFirstname:this.user.firstname,
          userLastname:this.user.lastname,
          userKey:this.user.id,
          rating:this.productReview,
          comment:this.productComment,
        }       
      });
      
      dialogRef.afterClosed().subscribe(result => {  
          
      subscribeDialog.unsubscribe();
      console.log(this.review, 2);
      this.productService.addProductReview(productId ,name,  this.review);  
    });
}

calculateDate(){
  var d = new Date();
  var curr_date = d.getDate();
  var curr_month = d.getMonth();
  var curr_year = d.getFullYear()
  var months = new Array("Ian", "Feb", "Mar",
    "Apr", "Mai", "Iun", "Iul", "Aug", "Sep",
    "Oct", "Nov", "Dec"); 

  return  curr_date + "-" + months[curr_month] + "-" + curr_year ;

}
}
