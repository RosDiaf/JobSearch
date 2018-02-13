import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AlertComponent } from '../common/alert/alert.component';
import { AccountSettingsComponent } from './account-settings.component';
import { DetailSettingsComponent } from '../detail-settings/detail-settings.component';
import { ReactiveFormsModule, FormsModule, FormArray, FormGroup, FormControl } from '@angular/forms';

describe('AccountSettingsComponent', () => {
  let component: AccountSettingsComponent;
  let fixture: ComponentFixture<AccountSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingsComponent, DetailSettingsComponent, AlertComponent ],
      imports: [ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Tab component', () => {
    let event;

    beforeEach(() => {
      event = {
        currentTarget: {
          firstElementChild: {
            className: 'w3-third tablink w3-bottombar w3-hover-light-grey w3-padding'
          }
        }
      };
    });

    it('should open first tab by default', () => {
      component.activeCssClass = ' w3-border-red';
      component.openTabContent(event, 'account');
      const elementAcc = fixture.debugElement.nativeElement.querySelector('#account');
      const elementNot = fixture.debugElement.nativeElement.querySelector('#notification');
      const elementDel = fixture.debugElement.nativeElement.querySelector('#delete');
      expect(elementAcc).not.toBeNull();
      expect(elementNot).not.toBeNull();
      expect(elementDel).not.toBeNull();
    });

    it('should open second tab when clicking notification', () => {
      component.activeCssClass = ' w3-border-red';
      component.openTabContent(event, 'notification');
      const elementAcc = fixture.debugElement.nativeElement.querySelector('#account');
      const elementNot = fixture.debugElement.nativeElement.querySelector('#notification');
      const elementDel = fixture.debugElement.nativeElement.querySelector('#delete');
      expect(elementAcc).not.toBeNull();
      expect(elementNot).not.toBeNull();
      expect(elementDel).not.toBeNull();
    });

    it('should open third tab when clicking delete', () => {
      component.activeCssClass = ' w3-border-red';
      component.openTabContent(event, 'delete');
      const elementAcc = fixture.debugElement.nativeElement.querySelector('#account');
      const elementNot = fixture.debugElement.nativeElement.querySelector('#notification');
      const elementDel = fixture.debugElement.nativeElement.querySelector('#delete');
      expect(elementAcc).not.toBeNull();
      expect(elementNot).not.toBeNull();
      expect(elementDel).not.toBeNull();
    });

    describe('Tab navigation label', () => {
      it('first tab should be labelled \"Account Settings\" ', () => {
        const elementAcc = fixture.debugElement.nativeElement.querySelector('#tab1');
        expect(elementAcc.textContent).toContain('Account Settings');
      });
      it('first tab should be labelled \"Notification Settings\" ', () => {
        const elementAcc = fixture.debugElement.nativeElement.querySelector('#tab2');
        expect(elementAcc.textContent).toContain('Notification Settings');
      });
      it('first tab should be labelled \"Delete Account\" ', () => {
        const elementAcc = fixture.debugElement.nativeElement.querySelector('#tab3');
        expect(elementAcc.textContent).toContain('Delete Account');
      });
    });
  });
});
