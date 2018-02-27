import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DetailsComponent } from './details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { AddressComponent } from '../address/address.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { FormComponent } from '../form/form.component';
import { ReactiveFormsModule, FormsModule, FormArray, FormGroup, FormControl } from '@angular/forms';
import { PostDetailsService } from '../api/post-details.service';
import { HttpModule, Http, Response, BaseRequestOptions} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Profile } from '../common/profile.model';
import { ProfileService } from '../api/profile.service';
import { SanitizerService } from '../common/sanitizer';

import { NgRedux, select } from '@angular-redux/store';
import { CustomerProfileActions } from '../store/profileReducer/profileActions';

class MockSanitizer {
  sanitizeInput(input) {
    return input;
  }
}

const fakeActivatedRoute = {
  snapshot: { data: {  } }
} as ActivatedRoute;


describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailsComponent,
        AddressComponent,
        ConfirmationComponent,
        FormComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        Ng4GeoautocompleteModule
      ],
      providers: [
        NgRedux,
        CustomerProfileActions,
        RouterTestingModule,
        PostDetailsService,
        ProfileService,
        HttpModule,
        Http,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (mockBackend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(mockBackend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        { provide: SanitizerService, useClass: MockSanitizer },
        { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'id': 1, 'roleid': 1 }]) } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Accordion panel states', () => {
    let form;

    beforeEach(() => {
      form = {
        controls: {
          name: {
            errors: { pattern: false },
            value: 'Rosario',
            valid: true
          },
          surname: {
            errors: { pattern: false },
            value: 'Diaferia',
            valid: true
          },
          email: {
            errors: { pattern: false },
            value: 'rosdiaf@aol.co.uk',
            valid: true
          },
          address: {
            errors: { pattern: false },
            value: '107 Maiden Lane Manhattan New York New York County New York United States 10038',
            valid: true
          },
          telephone: {
            errors: { pattern: false },
            value: '12345678900',
            valid: true
          },
          gender: {
            errors: { pattern: false },
            value: 'male',
            valid: true
          },
          day: {
            errors: { pattern: false },
            value: '01',
            valid: true
          },
          month: {
            errors: { pattern: false },
            value: '12',
            valid: true
          },
          year: {
            errors: { pattern: false },
            value: '2017',
            valid: true
          },
          skills: {
            controls:
            [
              {
                value: {
                  title: 'JavaScript'
                },
              },
              {
                value: {
                  title: 'Angular'
                },
              }
            ]
          },
          comments: {
            errors: { pattern: false },
            value: 'Test comments',
            valid: true
          }
        }
      };
    });

    it('should close first panel and open second one', () => {
      const spyOnAccordionPanelSate = spyOn(component, 'accordionPanelState');
      const spySanitizeInputForm = spyOn(component, 'sanitizeInputForm');
      const spyPostUserDetails = spyOn(component, 'postUserDetails');
      const userDetailsObjStringfy = '{"firstName":"Rosario","lastName":"Diaferia","emailAddress":"rosdiaf@aol.co.uk"}';

      component.goToNextStep(form.controls, 'part1');
      expect(spyOnAccordionPanelSate).toHaveBeenCalledWith(0, 1);
      expect(spySanitizeInputForm).toHaveBeenCalledWith(component.detailsForm, 'part1');
      expect(spyPostUserDetails).toHaveBeenCalledWith(userDetailsObjStringfy, 'Section 1');
    });

    it('should close second panel and open third one', () => {

      const spyOnAccordionPanelSate = spyOn(component, 'accordionPanelState');
      const spySanitizeInputForm = spyOn(component, 'sanitizeInputForm');
      const spyPostUserDetails = spyOn(component, 'postUserDetails');
      const userDetailsObjStringfy = '{"address":"107 Maiden Lane Manhattan New York New York County New York United States 10038"}';

      component.goToNextStep(form.controls, 'part2');

      expect(spyOnAccordionPanelSate).toHaveBeenCalledWith(1, 2);
      expect(spySanitizeInputForm).toHaveBeenCalledWith(component.detailsForm, 'part2');
      expect(spyPostUserDetails).toHaveBeenCalledWith(userDetailsObjStringfy, 'Section 2');
    });

    it('should close third panel and open fouth one', () => {

      const spyOnAccordionPanelSate = spyOn(component, 'accordionPanelState');
      const spySanitizeInputForm = spyOn(component, 'sanitizeInputForm');
      const spyPostUserDetails = spyOn(component, 'postUserDetails');
      const userDetailsObjStringfy = '{"telephone":"12345678900","gender":"male","day":"01","month":"12","year":"2017"}';

      component.goToNextStep(form.controls, 'part3');

      expect(spyOnAccordionPanelSate).toHaveBeenCalledWith(2, 3);
      expect(spySanitizeInputForm).toHaveBeenCalledWith(component.detailsForm, 'part3');
      expect(spyPostUserDetails).toHaveBeenCalledWith(userDetailsObjStringfy, 'Section 3');
    });

    it('should close fourth panel and open fifth one', () => {

      const spyOnAccordionPanelSate = spyOn(component, 'accordionPanelState');
      const spySanitizeInputForm = spyOn(component, 'sanitizeInputForm');
      const spyPostUserDetails = spyOn(component, 'postUserDetails');
      const userDetailsObjStringfy = '[{"skill":"JavaScript"},{"skill":"Angular"}]';

      component.goToNextStep(form.controls, 'part4');

      expect(spyOnAccordionPanelSate).toHaveBeenCalledWith(3, 4);
      expect(spySanitizeInputForm).toHaveBeenCalledWith(component.detailsForm, 'part4');
      expect(spyPostUserDetails).toHaveBeenCalledWith(userDetailsObjStringfy, 'Section 4');
    });

    it('should return empty user details object if skills not added', () => {

      form.controls.skills.controls[0].value.title = '';
      form.controls.skills.controls[1].value.title = '';
      component.goToNextStep(form.controls, 'part4');
      expect(component.userDetailsObjectStringfy).toEqual('[]');

    });

    it('should submit form if comments entered', () => {

      const spySanitizeInputForm = spyOn(component, 'sanitizeInputForm');
      const spyPostUserDetails = spyOn(component, 'postUserDetails');
      const spyShowConfirmationPage = spyOn(component, 'showConfirmationPage');
      const userDetailsObjStringfy = '{"comments":"Test comments"}';

      component.goToNextStep(form.controls, 'part5');

      expect(spySanitizeInputForm).toHaveBeenCalledWith(component.detailsForm, 'part5');
      expect(spyPostUserDetails).toHaveBeenCalledWith(userDetailsObjStringfy, 'Section 5');
      expect(spyShowConfirmationPage).toHaveBeenCalled();
    });

    it('should not submit form if comments are not entered', () => {

      form.controls.comments = '';
      const spyShowConfirmationPage = spyOn(component, 'showConfirmationPage');
      component.goToNextStep(form.controls, 'part5');
      expect(spyShowConfirmationPage).not.toHaveBeenCalledWith(form.controls);

    });

    describe('Submit form', () => {

      beforeEach(() => {
        component.profileService.profile.push(
          new Profile(
          'Rosario',
          'Diaferia',
          'rd@test.com',
          '1 High road N1',
          '12345678900',
          'male',
          14,
          2,
          1973,
          '[{"skill":"JavaScript"},{"skill":"Angular"}]',
          'test comment',
          0));
      });

      it('should set submit to true and update redux store', () => {
        const spySetProfileData = spyOn(component, 'setProfileData');
        const spyReduxStoreUpdateProfilePostalAddress = spyOn(component, 'reduxStoreUpdateProfilePostalAddress');
        const spyReduxStoreUpdateProfileTelephone = spyOn(component, 'reduxStoreUpdateProfileTelephone');
        const spyReduxStoreUpdateProfileDetails = spyOn(component, 'reduxStoreUpdateProfileDetails');
        const spyReduxStoreUpdateProfileSkills = spyOn(component, 'reduxStoreUpdateProfileSkills');
        const spyReduxStoreUpdateProfileComments = spyOn(component, 'reduxStoreUpdateProfileComments');

        component.showConfirmationPage(form.controls);

        expect(spySetProfileData).toHaveBeenCalledWith(form.controls);
        expect(spyReduxStoreUpdateProfilePostalAddress).toHaveBeenCalled();
        expect(spyReduxStoreUpdateProfileTelephone).toHaveBeenCalled();
        expect(spyReduxStoreUpdateProfileDetails).toHaveBeenCalled();
        expect(spyReduxStoreUpdateProfileSkills).toHaveBeenCalled();
        expect(spyReduxStoreUpdateProfileComments).toHaveBeenCalled();

      });

      it('should add profile data to profile object array', () => {
        const profileService = TestBed.get(ProfileService);
        const spy = spyOn(component, 'existingFormValues');
        component.profileId = 0;
        component.roleId = 0;
        component.ngOnInit();
        expect(profileService.profile.length).toEqual(1);
        expect(spy).toHaveBeenCalled();
      });

      it('should set existing form value available for ngModel', () => {
        const profileService = TestBed.get(ProfileService);
        component.profileId = 0;
        component.roleId = 0;
        component.existingFormValues();
        expect(component.firstName).toEqual('Rosario');
        expect(component.lastName).toEqual('Diaferia');
        expect(component.emailAddress).toEqual('rd@test.com');
        expect(component.postalAddress).toEqual('1 High road N1');
        expect(component.telephone).toEqual(12345678900);
        expect(component.gender).toEqual('male');
        expect(component.day).toEqual(14);
        expect(component.month).toEqual(2);
        expect(component.year).toEqual(1973);
        expect(component.comments).toEqual('test comment');
      });

      it('should clear the form if clear button is clicked', () => {
        const spy = spyOn(component, 'accordionPanelState');
        component.clearFields();
        expect(spy).toHaveBeenCalledWith(4, 0);
      });
    });

    describe('Sanitize input fields', () => {
      let sanitizeService;
      beforeEach(() => {
        sanitizeService = TestBed.get(SanitizerService);
      });

      it('should sanitize part 1 of the form when submitted', () => {
        const spySanitizeInput = spyOn(sanitizeService, 'sanitizeInput');
        component.sanitizeInputForm(form, 'part1');
        expect(spySanitizeInput).toHaveBeenCalledWith(form.controls['name'].value);
        expect(spySanitizeInput).toHaveBeenCalledWith(form.controls['surname'].value);
        expect(spySanitizeInput).toHaveBeenCalledWith(form.controls['email'].value);
      });

      it('should sanitize part 2 of the form when submitted', () => {
        const spySanitizeInput = spyOn(sanitizeService, 'sanitizeInput');
        component.sanitizeInputForm(form, 'part2');
        expect(spySanitizeInput).toHaveBeenCalledWith(form.controls['address'].value);
      });

      it('should sanitize part 3 of the form when submitted', () => {
        const spySanitizeInput = spyOn(sanitizeService, 'sanitizeInput');
        component.sanitizeInputForm(form, 'part3');
        expect(spySanitizeInput).toHaveBeenCalledWith(form.controls['telephone'].value);
        expect(spySanitizeInput).toHaveBeenCalledWith(form.controls['day'].value);
        expect(spySanitizeInput).toHaveBeenCalledWith(form.controls['month'].value);
        expect(spySanitizeInput).toHaveBeenCalledWith(form.controls['year'].value);
      });

      it('should sanitize part 5 of the form when submitted', () => {
        const spySanitizeInput = spyOn(sanitizeService, 'sanitizeInput');
        component.sanitizeInputForm(form, 'part5');
        expect(spySanitizeInput).toHaveBeenCalledWith(form.controls['comments'].value);
      });

      it('should not sanitize it form part name not provided', () => {
        const spySanitizeInput = spyOn(sanitizeService, 'sanitizeInput');
        component.sanitizeInputForm(form, '');
        expect(spySanitizeInput).not.toHaveBeenCalledWith(form.controls['name'].value);
      });
    });

    describe('Service response', () => {

      it('should display error message if service fails', () => {
        const objDetailsStringfy = {};
        const postDetailsService = TestBed.get(PostDetailsService);
        const spy = spyOn(postDetailsService, 'postDetails').and.returnValue(Observable.throw({status: 404}));
        component.postUserDetails(objDetailsStringfy, 'Section 1');
        expect(spy).toHaveBeenCalled();
        expect(component.hasServiceFailed).toBeTruthy();
      });

      it('should update profile data when if profile id exists', () => {
        const service = TestBed.get(ProfileService);
        const spyUpdateProfileData = spyOn(service, 'updateProfileData');
        component.profileId = 0;
        component.roleId = 0;
        component.setProfileData(form.controls);
        expect(spyUpdateProfileData).toHaveBeenCalledWith(form.controls, 0, 0);
      });

      it('should set profile data if profile id does not exists', () => {
        const service = TestBed.get(ProfileService);
        const spySetProfileData = spyOn(service, 'setProfileData');
        component.profileId = -1;
        component.roleId = 0;
        component.setProfileData(form.controls);
        expect(spySetProfileData).toHaveBeenCalledWith(form.controls, 0);
      });
    });
  });

  describe('Accordion panel css classes', () => {
    const accordionItemOpenState = 'accordionItem open';
    const accordionItemCloseState = 'accordionItem close';

    it('should open first panel and close second', () => {
      fixture.detectChanges();

      expect(component.accordionItem[0].className).toContain(component.accordionItemOpenState);
      expect(component.accordionItem[1].className).toContain(component.accordionItemCloseState);
      expect(component.accordionItem[2].className).toContain(component.accordionItemCloseState);
      expect(component.accordionItem[3].className).toContain(component.accordionItemCloseState);
      expect(component.accordionItem[4].className).toContain(component.accordionItemCloseState);
    });
  });

  describe('Add and delete form element', () => {
    it('should add new skill when clicking add button', () => {
      component.addNewSkill();
      const skillArrayLenght = (<FormArray>component.detailsForm.get('skills')).length;
      expect(skillArrayLenght).toBeGreaterThan(1);
    });

    it('should delete skill when clicking delete button', () => {
      component.deleteSkill(1); // By default there 2 skills added
      const skillArrayLenght = (<FormArray>component.detailsForm.get('skills')).length;
      expect(skillArrayLenght).toEqual(1); // there should be only 1
    });
  });

  describe('Post data service', () => {
    it('should post details for section 1', () => {
      const objDetailsStringfy = {'firstName': 'Ros', 'lastName': 'Diaf', 'emailAddress': 'rosdiaf@gmail.com'};
      const postDetailsService = TestBed.get(PostDetailsService);
      const spy = spyOn(postDetailsService, 'postDetails').and.returnValue(Observable.of(objDetailsStringfy));
      component.postUserDetails(objDetailsStringfy, 'Section 1');
      expect(spy).toHaveBeenCalled();
      expect(component.isSuccessfullyPosted).toBeTruthy();
      expect(component.sectionDetailsPosted).toEqual('Section 1');
    });

    it('should post details for section 2', () => {
      const objDetailsStringfy = {'address': '107 Maidstone Road London Greater London England United Kingdom N11 2JS'};
      const postDetailsService = TestBed.get(PostDetailsService);
      const spy = spyOn(postDetailsService, 'postDetails').and.returnValue(Observable.of(objDetailsStringfy));
      component.postUserDetails(objDetailsStringfy, 'Section 2');
      expect(spy).toHaveBeenCalled();
      expect(component.isSuccessfullyPosted).toBeTruthy();
      expect(component.sectionDetailsPosted).toEqual('Section 2');
    });

    it('should post details for section 3', () => {
      const objDetailsStringfy = {'telephone': '12345678900', 'day': '14', 'month': '02', 'year': '1973'};
      const postDetailsService = TestBed.get(PostDetailsService);
      const spy = spyOn(postDetailsService, 'postDetails').and.returnValue(Observable.of(objDetailsStringfy));
      component.postUserDetails(objDetailsStringfy, 'Section 3');
      expect(spy).toHaveBeenCalled();
      expect(component.isSuccessfullyPosted).toBeTruthy();
      expect(component.sectionDetailsPosted).toEqual('Section 3');
    });

    it('should post details for section 4', () => {
      const objDetailsStringfy = {'0': {'skill': 'JavaScript'},
                                  '1': {'skill': 'Angular 4'}, 'telephone': '12345678900', 'day': '14', 'month': '02', 'year': '1973'};
      const postDetailsService = TestBed.get(PostDetailsService);
      const spy = spyOn(postDetailsService, 'postDetails').and.returnValue(Observable.of(objDetailsStringfy));
      component.postUserDetails(objDetailsStringfy, 'Section 4');
      expect(spy).toHaveBeenCalled();
      expect(component.isSuccessfullyPosted).toBeTruthy();
      expect(component.sectionDetailsPosted).toEqual('Section 4');
    });

    it('should post details for section 5', () => {
      const objDetailsStringfy = {'comments': 'test comment'};
      const postDetailsService = TestBed.get(PostDetailsService);
      const spy = spyOn(postDetailsService, 'postDetails').and.returnValue(Observable.of(objDetailsStringfy));
      component.postUserDetails(objDetailsStringfy, 'Section 5');
      expect(spy).toHaveBeenCalled();
      expect(component.isSuccessfullyPosted).toBeTruthy();
      expect(component.sectionDetailsPosted).toEqual('Section 5');
    });
  });

  describe('Add and delete form element', () => {
    it('should add new skill when clicking add button', () => {

    });
  });

  describe('Reducer functions', () => {
    it('should update candidate\'s postal address when form is submitted', () => {
      component.detailsForm.controls['address'].setValue('107 Maidstone road N221JS');
      const postalAddress = {
        line1: '107 Maidstone road N221JS',
        line2: '',
        line3: '',
        line4: '',
        postcode: ''
      };
      const actions = TestBed.get(CustomerProfileActions);
      const spy = spyOn(actions, 'updateCustomerProfile');
      component.reduxStoreUpdateProfilePostalAddress();
      expect(spy).toHaveBeenCalledWith(postalAddress);
    });

    it('should update candidate\'s telephone when form is submitted', () => {
      component.detailsForm.controls['telephone'].setValue('12345678900');
      const homePhoneNumber = '12345678900';
      const actions = TestBed.get(CustomerProfileActions);
      const spy = spyOn(actions, 'updateContactHomePhoneSuccess');
      component.reduxStoreUpdateProfileTelephone();
      expect(spy).toHaveBeenCalledWith(homePhoneNumber);
    });

    it('should update candidate\'s details when form is submitted', () => {
      component.detailsForm.controls['day'].setValue('14');
      component.detailsForm.controls['month'].setValue('02');
      component.detailsForm.controls['year'].setValue('1973');
      component.detailsForm.controls['name'].setValue('Rosario');
      component.detailsForm.controls['surname'].setValue('Diaferia');
      component.detailsForm.controls['gender'].setValue('male');

      const personalDetails = {
        dateOfBirth: '14/02/1973',
        forename: 'Rosario',
        gender: 'male',
        surname: 'Diaferia',
      };
      const actions = TestBed.get(CustomerProfileActions);
      const spy = spyOn(actions, 'updatePersonalDetailsSuccess');
      component.reduxStoreUpdateProfileDetails();
      expect(spy).toHaveBeenCalledWith(personalDetails);
    });

    it('should update candidate\'s comments when form is submitted', () => {
      component.detailsForm.controls['comments'].setValue('Test comments..');
      const homePhoneNumber = 'Test comments..';
      const actions = TestBed.get(CustomerProfileActions);
      const spy = spyOn(actions, 'updateFinalComments');
      component.reduxStoreUpdateProfileComments();
      expect(spy).toHaveBeenCalledWith(homePhoneNumber);
    });

    it('should update candidate\'s skills when form is submitted', () => {
      const skillArray = [{title: 'Angular'}, {title: 'JavaScript'}];
      component.detailsForm.controls['skills'].setValue(skillArray);
      const skills = 'Angular,JavaScript,';
      const actions = TestBed.get(CustomerProfileActions);
      const spy = spyOn(actions, 'updateCandidateSkills');
      component.reduxStoreUpdateProfileSkills();
      expect(spy).toHaveBeenCalledWith(skills);
    });
  });

  describe('Profile object', () => {
    it('should assign google address value to postalAddress form field when step2 completed', () => {
      const selectedData = {
        data: {
          address_components: [
            {
              long_name: '107',
              short_name: '107',
              types: Array(1)
            },
            {
              long_name: 'Maiden Lane',
              short_name: 'Maiden Ln',
              types: Array(1)
            },
            {
              long_name: 'Manhattan',
              short_name: 'Manhattan',
              types: Array(3)
            },
            {
              long_name: 'New York',
              short_name: 'New York',
              types: Array(2)
            },
            {
              long_name: 'New York County',
              short_name: 'New York County',
              types: Array(2)
            },
            {
              long_name: 'New York',
              short_name: 'NY',
              types: Array(2)
            },
            {
              long_name: 'United States',
              short_name: 'US',
              types: Array(2)
            },
            {
              long_name: '10038',
              short_name: '10038',
              types: Array(1)
            }
          ],
          geometry: {
            location: {
              lat: 40.7069492,
              lng: -74.00666230000002
            }
          }
        }
      };
      const spy = spyOn(component, 'goToNextStep');
      component.lat = 40.7069492;
      component.lng = -74.00666230000002;
      component.fullAddressFromAutoComplete(selectedData);
      expect(component.postalAddress).toEqual('107 Maiden Lane Manhattan New York New York County New York United States 10038 ');
      expect(spy).toHaveBeenCalledWith(component.detailsForm.controls, 'part2');
    });
  });
});
