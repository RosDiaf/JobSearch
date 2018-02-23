import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from '../common/alert/alert.component';
import { DetailSettingsComponent } from './detail-settings.component';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormArray, FormGroup, FormControl } from '@angular/forms';
import { alert } from '../common/alert.messages';

describe('DetailSettingsComponent', () => {
  let component: DetailSettingsComponent;
  let fixture: ComponentFixture<DetailSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSettingsComponent, AlertComponent ],
      imports: [ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Accordion status', () => {
    it('should show \"change email\" content when tab is clicked', () => {
      component.tabAccordion = 'section1';
      component.setAccordionStatus('section1');

      const deSection1 = fixture.debugElement.queryAll(By.css('#section1'));
      const elSection1: HTMLElement = deSection1[0].nativeElement;
      expect(elSection1.className).toEqual('w3-container w3-hide w3-show');

      const deSection2 = fixture.debugElement.queryAll(By.css('#section2'));
      const elSection2: HTMLElement = deSection2[0].nativeElement;
      expect(elSection2.className).toEqual('w3-container w3-hide');
    });

    it('should show \"change password\" content when tab is clicked', () => {
      component.tabAccordion = 'section2';
      component.setAccordionStatus('section2');

      const deSection1 = fixture.debugElement.queryAll(By.css('#section1'));
      const elSection1: HTMLElement = deSection1[0].nativeElement;
      expect(elSection1.className).toEqual('w3-container w3-hide');

      const deSection2 = fixture.debugElement.queryAll(By.css('#section2'));
      const elSection2: HTMLElement = deSection2[0].nativeElement;
      expect(elSection2.className).toEqual('w3-container w3-hide w3-show');
    });

    it('should hide \"change email\" content when tab is clicked', () => {
      component.tabAccordion = 'section1';
      const deSection1 = fixture.debugElement.queryAll(By.css('#section1'));
      const elSection1: HTMLElement = deSection1[0].nativeElement;
      elSection1.className = 'w3-container w3-show';
      component.setAccordionStatus('section1');
      expect(elSection1.className).toEqual('w3-container');
    });

    it('should hide \"change password\" content when tab is clicked', () => {
      component.tabAccordion = 'section2';
      const deSection1 = fixture.debugElement.queryAll(By.css('#section2'));
      const elSection1: HTMLElement = deSection1[0].nativeElement;
      elSection1.className = 'w3-container w3-show';
      component.setAccordionStatus('section2');
      expect(elSection1.className).toEqual('w3-container');
    });
  });

  describe('Accrodion settings labels', () => {
    it('should contain \"change email\" label', () => {
      const elementAcc = fixture.debugElement.nativeElement.querySelector('#tab1');
      expect(elementAcc.textContent).toContain('Change Email Address');
    });

    it('should contain \"change password\" label', () => {
      const elementAcc = fixture.debugElement.nativeElement.querySelector('#tab2');
      expect(elementAcc.textContent).toContain('Change Password');
    });
  });

  describe('Submit email form update', () => {
    let form;
    beforeEach(() => {
      form = {
        controls: {
          email: {
            errors: { pattern: false },
            value: 'ros@aol.com',
            valid: true
          },
          password: {
            errors: { pattern: false },
            value: 'Ros12^sfss',
            valid: true
          },
        }
      };
    });

    it('should submit form if validation passed', () => {
      component.isSubmitted = false;
      component.emailUpdateForm.controls['email'].setValue('ros@aol.com');
      component.emailUpdateForm.controls['password'].setValue('Ros12^sfss');
      component.onSubmit();
      expect(component.isSubmitted).toBeTruthy();
      expect(component.updatedSuccessfully).toEqual(alert.emailUpdatedSuccessfully);
    });

    it('should not submit form if invalid email', () => {
      component.isSubmitted = false;
      component.emailUpdateForm.controls['email'].setValue('ros@aol.');
      component.emailUpdateForm.controls['password'].setValue('Ros12^sfss');
      component.onSubmit();
      expect(component.isSubmitted).toBeFalsy();
    });

    it('should not submit form if invalid password', () => {
      component.isSubmitted = false;
      component.emailUpdateForm.controls['email'].setValue('ros@aol.com');
      component.emailUpdateForm.controls['password'].setValue('Ros');
      component.onSubmit();
      expect(component.isSubmitted).toBeFalsy();
    });
  });

  describe('Submit password update form', () => {
    let form;
    beforeEach(() => {
      form = {
        controls: {
          password: {
            errors: { pattern: false },
            value: 'Ros12^sfss',
            valid: true
          },
          retype: {
            errors: { pattern: false },
            value: 'Ros12^sfss',
            valid: true
          },
        }
      };
    });
    
    it('should submit form if validation passed', () => {
      component.isPasswordSubmitted  = false;
      component.passwordUpdateForm.controls['password'].setValue('Ros12^sfss');
      component.passwordUpdateForm.controls['retype'].setValue('Ros12^sfss');
      component.onSubmit();
      expect(component.isPasswordSubmitted).toBeTruthy();
      expect(component.updatedSuccessfully).toEqual(alert.passwordUpdatedSuccessfully);
    });

    it('should not submit form if validation is not passed', () => {
      component.isPasswordSubmitted  = false;
      component.passwordUpdateForm.controls['password'].setValue('Ros12^sfss');
      component.passwordUpdateForm.controls['retype'].setValue('Ros12');
      component.onSubmit();
      expect(component.isPasswordSubmitted).toBeFalsy();
    });
  });
});
