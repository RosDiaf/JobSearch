import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyProfileComponent } from './my-profile.component';
import { customerData } from '../../mocks/profileDataMock';

describe('MyProfileComponent', () => {
  let component: MyProfileComponent;
  let fixture: ComponentFixture<MyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain \"My Profile\" label', () => {
    const elementAcc = fixture.debugElement.nativeElement.querySelector('#my-profile');
    expect(elementAcc.textContent).toContain('My Profile');
  });

  it('should contain avatar', () => {
    const elementAcc = fixture.debugElement.nativeElement.querySelector('#avatar');
    expect(elementAcc).not.toBeNull();
  });

  describe('Icons', () => {
    it('should show user icon', () => {
      const elementAcc = fixture.debugElement.nativeElement.querySelector('.fa-user');
      expect(elementAcc).not.toBeNull();
    });

    it('should show home icon', () => {
      const elementAcc = fixture.debugElement.nativeElement.querySelector('.fa-home');
      expect(elementAcc).not.toBeNull();
    });

    it('should show calendar icon', () => {
      const elementAcc = fixture.debugElement.nativeElement.querySelector('.fa-calendar-alt');
      expect(elementAcc).not.toBeNull();
    });

    it('should show phone icon', () => {
      const elementAcc = fixture.debugElement.nativeElement.querySelector('.fa-phone');
      expect(elementAcc).not.toBeNull();
    });

    it('should show mobile icon', () => {
      const elementAcc = fixture.debugElement.nativeElement.querySelector('.fa-mobile');
      expect(elementAcc).not.toBeNull();
    });

    it('should show email icon', () => {
      const elementAcc = fixture.debugElement.nativeElement.querySelector('.fa-at');
      expect(elementAcc).not.toBeNull();
    });
  });
});
