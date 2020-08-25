import { Component, OnInit, Input } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { IProduct } from 'src/app/product/product-interface';

@Component({
  selector: 'app-swiper-detail',
  templateUrl: './swiper-detail.component.html',
  styleUrls: ['./swiper-detail.component.css']
})
export class SwiperDetailComponent implements OnInit {

  @Input () urlImage1 :string; 
  @Input () urlImage2 :string;
  @Input () urlImage3 :string;

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

  ngOnInit(): void {
    console.log(this.urlImage1);
  }
}
