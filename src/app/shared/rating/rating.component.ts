import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnChanges {

  @Input() rating: number;
  starWidth:number;

  ngOnChanges():void{
    console.log(this.rating);
      this.starWidth = this.rating * 75 /5;
  }

}
