import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnChanges {

  @Input() rating: number;
  starWidth:number;

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  onClick():void{
      this.notify.emit(`The rating ${this.rating} was clicked`);
  }

  ngOnChanges():void{
      this.starWidth = this.rating * 75 /5;
  }
}
