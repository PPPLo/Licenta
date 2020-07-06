import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface DialogData {
  name: string;
  price: string;
  number: number;
  image:string;
}

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private route: Router) { }

  ngOnInit(): void {
  }

  onClose(){
    this.dialogRef.close();
  }

  onGoToCart(){
    this.dialogRef.close();
    this.route.navigate(['/cart']);
  }

}
