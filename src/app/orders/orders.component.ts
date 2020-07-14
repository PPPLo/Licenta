import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import { OrdersService } from './orders.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface IDeliveryInfo {
  firstname:string;
  lastname:string;
  address:string;
  location:string;
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

  addressForm : FormGroup;

  orderDeliveryInfoExistsFlag:boolean;

  constructor(private cartService: CartService,
              private userService: UsersService,
              private loginService: LoginService,
              private orderService: OrdersService,
              private router:Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cartService.getListItemsShoppingCartMapProducts().subscribe(products=>
      this.cartProducts=products);
    
    this.loginService.getCurrentUserDb().subscribe(user=>
      {this.loggedUser=user;
        if (user.deliveryInfo) this.orderDeliveryInfoExistsFlag=true;
        else this.orderDeliveryInfoExistsFlag = false;
      })

    this.addressForm = this.fb.group({
      firstname:[null, [Validators.required, Validators.maxLength(15)]],
      lastname: [null, [Validators.required, Validators.maxLength(15)]],
      address: [null, [Validators.required, Validators.maxLength(30)]],
      location: [null, [Validators.required, Validators.maxLength(15)]],
      state: [null, [Validators.required, Validators.maxLength(15)]],
      postalCode: [null, [Validators.required, Validators.pattern('[0-9]{6}'), Validators.maxLength(6)]],
      phoneNumber: [null, [Validators.required, Validators.pattern('[0-9]{10}'), Validators.maxLength(10)]]
    });

  }

  onSubmitAddress(form){

    let deliveryInfo: IDeliveryInfo = {
      firstname:this.addressForm.controls.firstname.value,
      lastname:this.addressForm.controls.lastname.value,
      address:this.addressForm.controls.address.value,
      location:this.addressForm.controls.location.value,
      state:this.addressForm.controls.state.value,
      postalCode:this.addressForm.controls.postalCode.value,
      phoneNumber:this.addressForm.controls.phoneNumber.value
    }

    if (this.saveUserAddress){
      this.userService.addDeliveryInformationToUser(this.loggedUser,deliveryInfo);
    }

    this.orderDeliveryInfoExistsFlag=true;

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
