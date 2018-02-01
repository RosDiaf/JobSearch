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
        { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'id': 1 }]) } }
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
                controls:
                {
                  name: {
                    errors: { pattern: false },
                    value: 'JavaScript',
                    valid: true
                  }
                }
              },
              {
                controls:
                {
                  name: {
                    errors: { pattern: false },
                    value: 'Angular',
                    valid: true
                  }
                }
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
      const userDetailsObjStringfy = '{"telephone":"12345678900","day":"01","month":"12","year":"2017"}';

      component.goToNextStep(form.controls, 'part3');

      expect(spyOnAccordionPanelSate).toHaveBeenCalledWith(2, 3);
      expect(spySanitizeInputForm).toHaveBeenCalledWith(component.detailsForm, 'part3');
      expect(spyPostUserDetails).toHaveBeenCalledWith(userDetailsObjStringfy, 'Section 3');
    });

    it('should submit comments', () => {

      const spySanitizeInputForm = spyOn(component, 'sanitizeInputForm');
      const spyPostUserDetails = spyOn(component, 'postUserDetails');
      const spyShowConfirmationPage = spyOn(component, 'showConfirmationPage');
      const userDetailsObjStringfy = '{"comments":"Test comments"}';

      component.goToNextStep(form.controls, 'part5');

      expect(spySanitizeInputForm).toHaveBeenCalledWith(component.detailsForm, 'part5');
      expect(spyPostUserDetails).toHaveBeenCalledWith(userDetailsObjStringfy, 'Section 5');
      expect(spyShowConfirmationPage).toHaveBeenCalled();
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

  xdescribe('Service response', () => {
    it('should display successfully message when service post data', () => {
      // const fixture = TestBed.createComponent(DetailsComponent);
      // const app = fixture.debugElement.componentInstance;
      component.isSuccessfullyPosted = true;
      const de = fixture.debugElement.query(By.css('.successfullMsg'));
      // fixture.detectChanges();
      // const el: HTMLElement = de.nativeElement;
      // let element2 = fixture.debugElement.nativeElement.querySelector(".successfullMsg");
      // expect(element2.textContent).toContain("come");
      expect(de).not.toBeNull();
      // expect(el.innerHTML).toContain('Your details have been sent!');
      // expect(fixture.componentInstance.isSuccessfullyPosted).toBeDefined();
    });
  });

  xdescribe('Profile object', () => {
    it('should return profile object', inject([ProfileService], (service: ProfileService) => {
      
      
      component.profileId = 0;
      service.profile.push(
        new Profile(
        "Rosario",
        "Diaferia",
        "rd@test.com",
        "1 High road N1",
        "12345678900",
        'male',
        14,
        2,
        1973,
        '',
        'test comment'));
      
      fixture.detectChanges();
      //component.ngOnInit();
      //expect(service.profile.length).toBeGreaterThan(0);
      const name = service.profile[0].name;
      console.log(name);
      expect(component.firstName).toEqual(name);

    }));
  });
});
