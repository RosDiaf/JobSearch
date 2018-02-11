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

    it('should display \'Manu bars\' on active load when app load', () => {
      const element = fixture.debugElement.nativeElement.querySelector('.fa-bars');
      expect(element).not.toBeNull();
    });

    it('should display \'Home Icon\' on active load when app load', () => {
      const element = fixture.debugElement.nativeElement.querySelector('.fa-home');
      expect(element).not.toBeNull();
    });

    it('should display \'User Icon\' on active load when app load', () => {
      const element = fixture.debugElement.nativeElement.querySelector('.fa-user');
      expect(element).not.toBeNull();
    });

    it('should display \'Globe Icon\' on active load when app load', () => {
      const element = fixture.debugElement.nativeElement.querySelector('.fa-globe');
      expect(element).not.toBeNull();
    });

    it('should display \'Envelope Icon\' on active load when app load', () => {
      const element = fixture.debugElement.nativeElement.querySelector('.fa-envelope');
      expect(element).not.toBeNull();
    });

    it('should display \'Bell Icon\' on active load when app load', () => {
      const element = fixture.debugElement.nativeElement.querySelector('.fa-bell');
      expect(element).not.toBeNull();
    });

    it('should display \'Settings\' on active load when app load', () => {
      const element = fixture.debugElement.nativeElement.querySelector('.fa-cog');
      expect(element).not.toBeNull();
    });

    it('should display \'Avatar\' on active load when app load', () => {
      const element = fixture.debugElement.nativeElement.querySelector('.w3-circle');
      expect(element).not.toBeNull();
    });
  });

  describe('Dropdown contents', () => {
    it('should display dropdown content on active load when app load', () => {
      const element = fixture.debugElement.nativeElement.querySelector('.w3-dropdown-content');
      expect(element).not.toBeNull();
    });

    it('should display dropdown content first item on active load when app load', () => {
      const element = fixture.debugElement.nativeElement.querySelector('#content_0');
      expect(element).not.toBeNull();
      expect(element.textContent).toContain('One new friend request');
    });
  });

  describe('Navbar on small screen', () => {
    it('should toggle responsive nav status to true when false', () => {
      component.responsiveNav = false;
      component.openNav();
      expect(component.responsiveNav).toBeTruthy();
    });

    it('should toggle responsive nav status to false when true', () => {
      component.responsiveNav = true;
      component.openNav();
      expect(component.responsiveNav).toBeFalsy();
    });

    it('should display navbar on small screen when responsiveNav is true', () => {
      component.responsiveNav = true;
      fixture.detectChanges();
      const element = fixture.debugElement.nativeElement.querySelector('.w3-show');
      expect(element).not.toBeNull();
    });

    it('should not display navbar on small screen when responsiveNav is false', () => {
      component.responsiveNav = false;
      fixture.detectChanges();
      const element = fixture.debugElement.nativeElement.querySelector('.w3-show');
      expect(element).toBeNull();
    });

    it('should display \'Home\' link navbar on small screen when responsiveNav is true', () => {
      component.responsiveNav = true;
      fixture.detectChanges();
      const element = fixture.debugElement.nativeElement.querySelector('#small-screen-item-1');
      expect(element).not.toBeNull();
      expect(element.textContent).toContain('Home');
    });

    it('should display \'Profile\' link navbar on small screen when responsiveNav is true', () => {
      component.responsiveNav = true;
      fixture.detectChanges();
      const element = fixture.debugElement.nativeElement.querySelector('#small-screen-item-2');
      expect(element).not.toBeNull();
      expect(element.textContent).toContain('Profile');
    });

    it('should display \'Link 3\' link navbar on small screen when responsiveNav is true', () => {
      component.responsiveNav = true;
      fixture.detectChanges();
      const element = fixture.debugElement.nativeElement.querySelector('#small-screen-item-3');
      expect(element).not.toBeNull();
      expect(element.textContent).toContain('Link 3');
    });

    it('should display \'My Profile\' link navbar on small screen when responsiveNav is true', () => {
      component.responsiveNav = true;
      fixture.detectChanges();
      const element = fixture.debugElement.nativeElement.querySelector('#small-screen-item-4');
      expect(element).not.toBeNull();
      expect(element.textContent).toContain('My Profile');
    });
  });
});
