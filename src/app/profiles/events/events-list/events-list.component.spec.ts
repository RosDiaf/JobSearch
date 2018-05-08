import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsListComponent } from './events-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from '../../../common/pipe/shorten.pipe';
import { FilterPipe } from '../../../common/pipe/filter.pipe';
import { events } from '../../../common/events';

describe('EventsListComponent', () => {
  let component: EventsListComponent;
  let fixture: ComponentFixture<EventsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsListComponent, ShortenPipe, FilterPipe ],
      imports: [FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Event List', () => {
    it('should display all the event list when button \'Show All\' is clicked', () => {
      component.showAllEvents = false;
      component.showEventsList();
      expect(component.showAllEvents).toBeTruthy();
      expect(component.eventBtnLabel).toEqual('Hide All');
      expect(component.selectEventDisabled).toBe(true);
    });
    
    it('should hide all the event list when button \'Hide All\' is clicked', () => {
      component.showAllEvents = true;
      component.showEventsList();
      expect(component.showAllEvents).toBeFalsy();
      expect(component.eventBtnLabel).toEqual('Show All');
      expect(component.selectEventDisabled).toBe(false);
    });
  });
});
