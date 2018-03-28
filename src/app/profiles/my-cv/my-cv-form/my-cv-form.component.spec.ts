import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormArray, FormGroup, FormControl } from '@angular/forms';
import { AlertComponent } from '../../../common/alert/alert.component';
import { alert } from '../../../common/alert.messages';
import { MyCvFormComponent } from './my-cv-form.component';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('MyCvFormComponent', () => {
  let component: MyCvFormComponent;
  let fixture: ComponentFixture<MyCvFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCvFormComponent, AlertComponent ],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [{provide: Router, useClass: RouterStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('DOM elements', () => {
    it('should have h1 tag', () => {
      fixture.detectChanges();
      const element = fixture.debugElement.nativeElement.querySelector('h1');
      expect(element).not.toBeNull();
      expect(element.textContent).toContain('Upload your CV');
    });

    it('should have form field file', () => {
      fixture.detectChanges();
      const element = fixture.debugElement.nativeElement.querySelector('#file');
      expect(element).not.toBeNull();
    });

    it('should have form field status', () => {
      fixture.detectChanges();
      const element = fixture.debugElement.nativeElement.querySelector('#status');
      expect(element).not.toBeNull();
    });
  });

  describe('Add CV file', () => {
    let EventObj;
    beforeEach(() => {
      EventObj = {
        srcElement: { 
          files: [
            {
              name: undefined,
              size: 27136,
              type: ''
            }
          ]
        }
      }
    });

    it('Should validate file as invalid if type not supported', () => {
      let spy = spyOn(component, 'validateFile').and.returnValue(false);
      component.onChange(EventObj);
      expect(spy).toHaveBeenCalledWith(EventObj.srcElement.files[0].name);
      expect(component.fileSelected).toBe(false);
      expect(component.fileTypeNotSupported).toEqual('File type not supported!');
    });

    it('Should validate file as valid if type supported', () => {
      let spy = spyOn(component, 'validateFile').and.returnValue(true);
      component.onChange(EventObj);
      expect(spy).toHaveBeenCalledWith(EventObj.srcElement.files[0].name);
      expect(component.fileSelected).toBe(true);
    });

    it('Should validate file type and return true if valid', () => {
      EventObj.srcElement.files.name = 'CV.doc';
      component.validateFile(EventObj.srcElement.files.name);
      expect(component.validateFile(EventObj.srcElement.files.name)).toBeTruthy();
    });

    it('Should validate file type and return false if not valid', () => {
      EventObj.srcElement.files.name = 'CV.gif';
      component.validateFile(EventObj.srcElement.files.name);
      expect(component.validateFile(EventObj.srcElement.files.name)).toBeFalsy();
    });
  });

  describe('Input validation', () => {
    it('should return true if all input fields are valid with permanent option selected', () => {
      component.cvForm.controls['status'].setValue('show');
      component.cvForm.controls['permanent'].setValue('perm');
      component.cvForm.controls['salaryType'].setValue('annual');
      component.validateInputField();
      expect(component.validateInputField()).toBeTruthy();
    });
    it('should return true if all input fields are valid with contract option selected', () => {
      component.cvForm.controls['status'].setValue('show');
      component.cvForm.controls['contract'].setValue('contract');
      component.cvForm.controls['salaryType'].setValue('annual');
      component.validateInputField();
      expect(component.validateInputField()).toBeTruthy();
    });
    it('should return true if all input fields are valid with temp option selected', () => {
      component.cvForm.controls['status'].setValue('show');
      component.cvForm.controls['temporary'].setValue('temp');
      component.cvForm.controls['salaryType'].setValue('annual');
      component.validateInputField();
      expect(component.validateInputField()).toBeTruthy();
    });
    it('should return true if all input fields are valid with part-time option selected', () => {
      component.cvForm.controls['status'].setValue('show');
      component.cvForm.controls['partTime'].setValue('partTime');
      component.cvForm.controls['salaryType'].setValue('annual');
      component.validateInputField();
      expect(component.validateInputField()).toBeTruthy();
    });
    it('should return false one input field is not valid', () => {
      component.cvForm.controls['status'].setValue(null);
      component.validateInputField();
      expect(component.validateInputField()).toBeFalsy();
    });
  });

  describe('Select option validation', () => {
    it('should return false if one select option (salaryFrom) is not valid', () => {
      component.cvForm.controls['salaryFrom'].setValue(null);
      component.validateSelectDropDownOption();
      expect(component.selectFromDropDown).toBe(true);
      expect(component.validateSelectDropDownOption()).toBeFalsy();
    });

    it('should return false if one select option (salaryTo) is not valid', () => {
      component.cvForm.controls['salaryTo'].setValue(null);
      component.validateSelectDropDownOption();
      expect(component.validateSelectDropDownOption()).toBeFalsy();
    });

    it('should return true if both select option are valid', () => {
      component.cvForm.controls['salaryFrom'].setValue('20000');
      component.cvForm.controls['salaryTo'].setValue('30000');
      component.validateSelectDropDownOption();
      expect(component.selectFromDropDown).toBe(false);
      expect(component.validateSelectDropDownOption()).toBeTruthy();
    });
  });

  describe('submit form if valid data provided', () => {
    it('should display successfully message if form validated', () => {
      component.fileSelected = true;
      let spyInput = spyOn(component, 'validateInputField').and.returnValue(true);
      let spySelectOptions = spyOn(component, 'validateSelectDropDownOption').and.returnValue(true);
      component.onSubmit();
      expect(component.isSubmitted).toBe(true);
      expect(component.cvUploadedSuccessfully).toEqual(alert.cvUploadedSuccessfully);
    });

    it('should not display successfully message if form not validated', () => {
      component.fileSelected = true;
      let spyInput = spyOn(component, 'validateInputField').and.returnValue(false);
      let spySelectOptions = spyOn(component, 'validateSelectDropDownOption').and.returnValue(false);
      component.onSubmit();
      expect(component.onSubmit()).toBeFalsy();
    });
  });
  
  describe('Back to previous view', () => {
    it('should return to profile view when clicking back button', inject([Router], (router: Router) => {
      const spy = spyOn(router, 'navigateByUrl');
      component.back();
      const url = spy.calls.first().args[0];
      expect(url).toBe('/profiles');
    }));
  });
});
