import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideshowComponent } from './slideshow.component';
import { upcomingEvents } from '../../common/events';

describe('SlideshowComponent', () => {
  let component: SlideshowComponent;
  let fixture: ComponentFixture<SlideshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('showSlide', () => {
    it('should display slide 1 when id is 1', () => {
      component.upcomingEvents = upcomingEvents;
      component.showSlide(1);
      expect(component.displaySlide).toEqual(1);
    });

    it('should display slide 2 when id is 2', () => {
      component.upcomingEvents = upcomingEvents;
      component.showSlide(2);
      expect(component.displaySlide).toEqual(2);
    });

    it('should display slide 3 when id is 3', () => {
      component.upcomingEvents = upcomingEvents;
      component.showSlide(3);
      expect(component.displaySlide).toEqual(3);
    });

    it('should display slide 4 when id is 4', () => {
      component.upcomingEvents = upcomingEvents;
      component.showSlide(4);
      expect(component.displaySlide).toEqual(4);
    });

    it('should display slide 5 when id is 5', () => {
      component.upcomingEvents = upcomingEvents;
      component.showSlide(5);
      expect(component.displaySlide).toEqual(5);
    });

    it('should display slide 6 when id is 6', () => {
      component.upcomingEvents = upcomingEvents;
      component.showSlide(6);
      expect(component.displaySlide).toEqual(6);
    });

    it('should display slide 7 when id is 7', () => {
      component.upcomingEvents = upcomingEvents;
      component.showSlide(7);
      expect(component.displaySlide).toEqual(7);
    });
  });
});
