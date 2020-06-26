import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  orderId:string;
  orderStatus:string;
  constructor(private route:Router,
    private activatedRoute:ActivatedRoute) { }

  onContinueShopping(){
    this.route.navigate(['/welcome']);
  }

  ngOnInit(): void {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('status');
  }

}
