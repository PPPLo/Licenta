import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() rating: number;
  starWidth:number;

  @Output() notify: EventEmitter<number> = new EventEmitter<number>();
  onClick():void{
      this.notify.emit(this.rating);
  }

  ngOnInit():void{
    console.log(this.rating);
      this.starWidth = this.rating * 75 /5;
  }

}
