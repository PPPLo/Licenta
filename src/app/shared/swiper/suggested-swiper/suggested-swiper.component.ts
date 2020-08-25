import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { IProduct } from 'src/app/product/product-interface';

@Component({
  selector: 'app-suggested-swiper',
  templateUrl: './suggested-swiper.component.html',
  styleUrls: ['./suggested-swiper.component.css']
})
export class SuggestedSwiperComponent implements OnInit {

  @Input () suggestedProducts: IProduct[];
  @Output() clicked = new EventEmitter();

  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    autoHeight: true,
    allowTouchMove: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: true
    },
    breakpoints: {
      600: {
        slidesPerView: 1
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: true,
    spaceBetween: 25
  };

  constructor() { }

  onChange(name:string){
    this.clicked.emit(name);
    console.log("clicked");
  }

  ngOnInit(): void {
  }

}
