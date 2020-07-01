import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.css']
})
export class RatingDialogComponent implements OnInit {

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  commentValue: string;

  notify = new EventEmitter<{rating:number, comment:string}>();

  constructor( public dialogRef: MatDialogRef<RatingDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public idCourse) {
                 }

  ngOnInit(): void {
  }

  countStar(star) {
    this.selectedValue = star;
    console.log('Value of star', star);
  }

  onSaveReview(){
    this.notify.emit({rating:this.selectedValue,comment:this.commentValue});
    this.dialogRef.close();
  }

  onClose(){
    this.dialogRef.close();
  }
}
