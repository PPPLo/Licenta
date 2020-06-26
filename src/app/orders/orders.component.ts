import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import { OrdersService } from './orders.service';

export interface IDeliveryInfo {
  firstname:string;
  lastname:string;
  address:string;
  location:string;
  country:string;
  state:string;
  postalCode:number;
  phoneNumber:number;
}

const standardTransporPrice = 20;
const nextDayTransporPrice = 45;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  cartProducts:any[];
  totalPrice:number;
  transportPrice:number;
  loggedUser: any;
  saveUserAddress: boolean = false;

  firstname:string;
  lastname:string;
  address:string;
  location:string;
  country:string;
  state:string;
  postalCode:number;
  phoneNumber:number;

  deliveryOption:number = 1;

  orderDeliveryInfoExistsFlag:boolean;

  constructor(private cartService: CartService,
              private userService: UsersService,
              private loginService: LoginService,
              private orderService: OrdersService,
              private router:Router) { }

  ngOnInit(): void {
    this.cartService.getListItemsShoppingCartMapProducts().subscribe(products=>
      this.cartProducts=products);
    
    this.loginService.getCurrentUserDb().subscribe(user=>
      {this.loggedUser=user;
        if (user.deliveryInfo) this.orderDeliveryInfoExistsFlag=true;
        else this.orderDeliveryInfoExistsFlag = false;
      })
  }

  getTotalPrice(){
    if(!this.cartProducts)return;
    this.totalPrice=0;
    this.cartProducts.forEach(product=>{
      this.totalPrice=this.totalPrice + product.price*product.itemsnumber;
    })
    return this.totalPrice;
  }

  getTransportPrice(){
    if(!this.cartProducts)return;
    this.transportPrice=0;
    this.cartProducts.forEach(product=>{     
      if (this.deliveryOption==1)
      {
        this.transportPrice= (this.totalPrice>200)?0:standardTransporPrice;
      }
      else if (this.deliveryOption==2)
      {
        this.transportPrice= nextDayTransporPrice;
      }
      else if (this.deliveryOption==3)
      {
        this.transportPrice= 0;
      }
    })
    return this.transportPrice;
  }

  getFinalPrice(){
    return this.transportPrice+this.totalPrice;
  }

  onBackToCart(){
    this.router.navigate(['/cart']);
  }

  onAuthentification(){
    this.router.navigate(['/login']);
  }

  toggle(event){
    this.saveUserAddress=!this.saveUserAddress;
    console.log(this.saveUserAddress);
  }

  onGoToDelivery(){

    let deliveryInfo: IDeliveryInfo = {firstname:this.firstname,
      lastname:this.lastname,
      address:this.address,
      location:this.location,
      country:this.country,
      state:this.state,
      postalCode:this.postalCode,
      phoneNumber:this.phoneNumber}


    console.log(deliveryInfo);
    console.log(this.firstname);
    if (this.saveUserAddress){
      this.userService.addDeliveryInformationToUser(this.loggedUser,deliveryInfo);
    }

    this.orderDeliveryInfoExistsFlag=true;
  }

  onDeliveryOptionsEdit(){
    this.orderDeliveryInfoExistsFlag=false;
  }

  async onOrderFinalization(){
  {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear()
    var months = new Array("Ian", "Feb", "Mar",
      "Apr", "Mai", "Iun", "Iul", "Aug", "Sep",
      "Oct", "Nov", "Dec"); 

    var today = curr_date + "-" + months[curr_month] + "-" + curr_year ; 

    let order={
      dateCreated:today,
      userId:this.loggedUser.id,
      items:this.cartProducts,
      total:this.getFinalPrice(),
      paid:false,
      transport:this.deliveryOption,
      status:"În pregătire"
    }

    let orderResult:any;
    

    orderResult=await this.orderService.createOrder(order);

    this.cartService.clearShpoppingCart();
    console.log(orderResult.key);
    this.router.navigate(['/order-status', orderResult.key]);
  }
  }

}
