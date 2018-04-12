import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsListComponent } from './events-list.component';
import { events } from '../../../common/events';

describe('EventsListComponent', () => {
  let component: EventsListComponent;
  let fixture: ComponentFixture<EventsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsListComponent ]
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

  describe('Event contents', () => {
    it('should display event title when profile page visited', () => {
      const element = fixture.debugElement.nativeElement.querySelector('h4 a');
      expect(element).not.toBeNull();
      expect(element.textContent).toContain('Linux Foundation 2018 events list');
    });

    it('should display event author and date when profile page visited', () => {
      const element = fixture.debugElement.nativeElement.querySelector('small');
      expect(element).not.toBeNull();
      expect(element.textContent).toContain('Adrian Bridgwater | 27 Nov 2017');
    });

    it('should display event description when profile page visited', () => {
      const element = fixture.debugElement.nativeElement.querySelector('p');
      expect(element).not.toBeNull();
      expect(element.textContent).toContain('The Linux Foundation has released');
    });
  });
});
