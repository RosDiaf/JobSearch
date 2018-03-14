import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JobAlertFormComponent } from './job-alert-form.component';
import { ReactiveFormsModule, FormsModule, FormArray, FormGroup, FormControl } from '@angular/forms';
import { AlertComponent } from '../../../common/alert/alert.component';
import { alert } from '../../../common/alert.messages';

describe('JobAlertFormComponent', () => {
  let component: JobAlertFormComponent;
  let fixture: ComponentFixture<JobAlertFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobAlertFormComponent, AlertComponent ],
      imports: [ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAlertFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Submit form', () => {
    let form;
    beforeEach(() => {
      form = {
        controls: {
          keywords: {
            errors: { pattern: false },
            value: 'Sales',
            valid: true
          },
          contains1: {
            errors: { pattern: false },
            value: 'any',
            valid: true
          },
          locations: {
            errors: { pattern: false },
            value: 'London',
            valid: true
          },
          miles: {
            errors: { pattern: false },
            value: '20',
            valid: true
          },
          jobTitle: {
            errors: { pattern: false },
            value: 'Manager',
            valid: true
          },
          contains2: {
            errors: { pattern: false },
            value: 'any',
            valid: true
          },
        }
      };
    });

    it('should submit form if values are valid', () => {
      component.alertForm.controls['keywords'].setValue('Sales');
      component.alertForm.controls['contains1'].setValue('any');
      component.alertForm.controls['locations'].setValue('London');
      component.alertForm.controls['miles'].setValue('20');
      component.alertForm.controls['jobTitle'].setValue('Manager');
      component.alertForm.controls['contains2'].setValue('any');
      component.onSubmit();
      expect(component.isSubmitted).toBe(true);
      expect(component.alertCreatedSuccessfully).toBe(alert.alertCreatedSuccessfully);
    });

    it('should not submit form if values not valid', () => {
      component.alertForm.controls['keywords'].setValue('Sales^^^');
      component.alertForm.controls['contains1'].setValue('any&&*');
      component.alertForm.controls['locations'].setValue('London>>');
      component.alertForm.controls['miles'].setValue('20');
      component.alertForm.controls['jobTitle'].setValue('Manager');
      component.alertForm.controls['contains2'].setValue('any');
      component.onSubmit();
      expect(component.isSubmitted).toBe(undefined);
    });
  });

  describe('DOM elements', () => {
    it('should have h1 tag', () => {
      fixture.detectChanges();
      const element = fixture.debugElement.nativeElement.querySelector('h1');
      expect(element).not.toBeNull();
      expect(element.textContent).toContain('Create alert');
    });

    it('should have form elements', () => {
      fixture.detectChanges();
      const elmKeywords = fixture.debugElement.nativeElement.querySelector('#keywords');
      const elmFilterSearch1 = fixture.debugElement.nativeElement.querySelector('#contains1');
      const elmFilterSearch2 = fixture.debugElement.nativeElement.querySelector('#contains2');
      const elmLocations = fixture.debugElement.nativeElement.querySelector('#locations');
      const elmMiles = fixture.debugElement.nativeElement.querySelector('#miles');
      const elmJobTitle = fixture.debugElement.nativeElement.querySelector('#jobTitle');
      const elmButton = fixture.debugElement.nativeElement.querySelector('.w3-button');
      expect(elmKeywords).not.toBeNull();
      expect(elmFilterSearch1).not.toBeNull();
      expect(elmFilterSearch2).not.toBeNull();
      expect(elmMiles).not.toBeNull();
      expect(elmJobTitle).not.toBeNull();
      expect(elmButton).not.toBeNull();
      expect(elmButton.textContent).toEqual('Save');
    });
  });
});
