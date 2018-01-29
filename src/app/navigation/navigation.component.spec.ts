import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Nativation menu', () => {
    it('should display \'Home\' on active load when app load', () => {
      const element = fixture.debugElement.nativeElement.querySelector('.active');
      expect(element.textContent).toContain('Home');
    });

    it('should display \'Profiles\' on last item when app load', () => {
      const element = fixture.debugElement.nativeElement.querySelector('#item-2');
      expect(element.textContent).toContain('Profiles');
    });

    it('should display \'Apply\' on last item when app load', () => {
      const element = fixture.debugElement.nativeElement.querySelector('#item-3');
      expect(element.textContent).toContain('Apply');
    });

    it('should display \'Contact\' on last item when app load', () => {
      const element = fixture.debugElement.nativeElement.querySelector('#item-4');
      expect(element.textContent).toContain('Contact');
    });

    it('should display \'About\' on last item when app load', () => {
      const element = fixture.debugElement.nativeElement.querySelector('.nav-last-item');
      expect(element.textContent).toContain('About');
    });
  });
});
