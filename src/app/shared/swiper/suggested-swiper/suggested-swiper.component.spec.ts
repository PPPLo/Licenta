import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedSwiperComponent } from './suggested-swiper.component';

describe('SuggestedSwiperComponent', () => {
  let component: SuggestedSwiperComponent;
  let fixture: ComponentFixture<SuggestedSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedSwiperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
