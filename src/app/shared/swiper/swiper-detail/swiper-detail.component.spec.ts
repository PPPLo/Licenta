import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperDetailComponent } from './swiper-detail.component';

describe('SwiperDetailComponent', () => {
  let component: SwiperDetailComponent;
  let fixture: ComponentFixture<SwiperDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiperDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiperDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
