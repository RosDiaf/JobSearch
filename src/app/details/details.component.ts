import { Component, OnInit, Input, ChangeDetectorRef, Output } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, NgModel } from '@angular/forms';
import { AddressComponent } from '../address/address.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { FormComponent } from '../form/form.component';
import { alert } from '../common/alert.messages';
import { PostDetailsService } from '../api/post-details.service';
import { SanitizerService } from '../common/sanitizer';
import { Skills } from '../common/skills.model';
import { ProfileService } from '../api/profile.service';
import { ActivatedRoute  } from '@angular/router';

// -- Redux
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { CustomerProfileActions } from '../store/profileReducer/profileActions';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  errorMessage = [alert.name, alert.email, alert.telephone, alert.gender, alert.day, alert.month, alert.year, alert.comment, alert.skill];
  accordionItem = document.getElementsByClassName('accordionItem');
  accordionItemOpenState = 'accordionItem open';
  accordionItemCloseState = 'accordionItem close';

  detailsForm: FormGroup;
  formElementTypeName = true;
  formElementTypeSurname = true;
  formElementTypeEmail = true;
  formElementTypeTelephone = true;
  formElementTypeGender = true;
  formElementTypeDOB = true;
  formElementTypeSkills = true;
  formElementTypeComments = true;

  profileId: number;
  firstName: string;
  lastName: string;
  emailAddress: any;
  postalAddress: string;
  telephone: number;
  gender: string;
  day: number;
  month: number;
  year: number;
  comments: any;
  skills: Skills[] = [
    new Skills('JavaScript'),
    new Skills('Angular 4')
  ];
  newSkills = new FormArray([]);
  lat: any;
  lng: any;
  zoom = 15;
  label = 'A';
  userDetailsObject: any;
  submitted = false;
  isSuccessfullyPosted: boolean;
  hasServiceFailed: boolean;
  sectionDetailsPosted: string;
  userDetailsObjectStringfy: string;

  existingProfileName: string;

  @select(['customerProfile', 'customerData', 'personalDetails']) personalDetails: Observable<any>;
  @select(['customerProfile', 'customerData', 'contactDetails']) contactDetails: Observable<any>;

  constructor(private formBuilder: FormBuilder,
              private postDetailsService: PostDetailsService,
              private sanitizerService: SanitizerService,
              private ref: ChangeDetectorRef,
              private profileService: ProfileService,
              private route: ActivatedRoute,
              private customerProfileActions: CustomerProfileActions) {

    this.buildForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.profileId = Number.parseInt(params['id']);
      if (this.profileService.profile.length > 0) {
        this.firstName = this.profileService.profile[this.profileId].name;
        this.lastName = this.profileService.profile[this.profileId].surname;
        this.emailAddress = this.profileService.profile[this.profileId].email;
        this.postalAddress = this.profileService.profile[this.profileId].address;
        this.telephone = parseInt(this.profileService.profile[this.profileId].telephone, 10);
        this.gender = this.profileService.profile[this.profileId].gender;
        this.day = this.profileService.profile[this.profileId].day;
        this.month = this.profileService.profile[this.profileId].month;
        this.year = this.profileService.profile[this.profileId].year;
        this.newSkills = this.profileService.profile[this.profileId].skills;
        this.comments = this.profileService.profile[this.profileId].comments;
      }
    });
  }

    buildForm() {
      for (let i = 0; i < this.skills.length; i++) {
        this.newSkills.push(
          new FormGroup({
            'title': new FormControl(this.skills[i].skill,
                        [Validators.required, Validators.pattern('^(?=[a-zA-Z0-9])([A-Za-z0-9 \' -]*)+$')])
          })
        );
      }

      this.detailsForm = this.formBuilder.group({
        name: this.formBuilder.control(null, [Validators.required, Validators.pattern('^(?=[a-zA-Z])([A-Za-z \' -]*)+$')]),
        surname: this.formBuilder.control(null, [Validators.required, Validators.pattern('^(?=[a-zA-Z])([A-Za-z \' -]*)+$')]),
        email: this.formBuilder.control(null, [Validators.required,
               Validators.pattern('^[a-zA-Z]+[a-zA-Z0-9_#\'\\?`\\.{}-]*@[a-zA-Z]+[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[A-Za-z]{2,})$')]),
        address: this.formBuilder.control(null),
        telephone: this.formBuilder.control(null, [Validators.required, Validators.pattern('[0-9]{11}$')]),
        gender: this.formBuilder.control('Select Gender v', [Validators.required, Validators.pattern('(male|female)$')]),
        day: this.formBuilder.control(null, [Validators.required, Validators.pattern('[0-9]{2}$')]),
        month: this.formBuilder.control(null, [Validators.required, Validators.pattern('(01|02|03|04|05|06|07|08|09|10|11|12)$$')]),
        year: this.formBuilder.control(null, [Validators.required, Validators.pattern('[1-2]{1}[0-9]{3}$')]),
        comments: this.formBuilder.control(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_ ,.!?]*$')]),
        skills: this.newSkills
      });
    }

    fullAddressFromAutoComplete(selectedData) {

      this.lat = selectedData.data.geometry.location.lat;
      this.lng = selectedData.data.geometry.location.lng;
      this.postalAddress = '';

      for (let i = 0; i < selectedData.data.address_components.length; i++) {
        this.postalAddress += selectedData.data.address_components[i].long_name + ' ';
      }

      this.detailsForm.controls['address'].setValue(this.postalAddress);
      this.goToNextStep(this.detailsForm.controls, 'part2');
    }

    goToNextStep(controls, part) {
      if (part === 'part1' && controls.name.value !== null && controls.surname.value !== null && controls.email.value !== null) {

        // -- Update accordion panel states
        this.accordionPanelState(0, 1);

        // -- Sanitize input fields
        this.sanitizeInputForm(this.detailsForm, part);

        // -- Create object, stringfy it and post
        this.userDetailsObject = { 'firstName': controls.name.value,
                                   'lastName': controls.surname.value,
                                   'emailAddress': controls.email.value };
        this.userDetailsObjectStringfy = JSON.stringify(this.userDetailsObject);
        this.postUserDetails(this.userDetailsObjectStringfy, 'Section 1');

      } else if (part === 'part2' && controls.address.value !== null) {

        // -- Update accordion panel states
        this.accordionPanelState(1, 2);

        // -- Sanitize input fields
        this.sanitizeInputForm(this.detailsForm, part);

        // -- Add address from google service to the form
        this.detailsForm.controls['address'].setValue(controls.address.value);

        // -- Create object, stringfy it and post
        this.userDetailsObject = { 'address': controls.address.value };
        this.userDetailsObjectStringfy = JSON.stringify(this.userDetailsObject);
        this.postUserDetails(this.userDetailsObjectStringfy, 'Section 2');


      } else if (part === 'part3' && controls.telephone.valid && controls.day.valid && controls.month.valid && controls.year.valid) {

        // -- Update accordion panel states
        this.accordionPanelState(2, 3);

        // -- Sanitize input fields
        this.sanitizeInputForm(this.detailsForm, part);

        // -- Create object, stringfy it and post
        this.userDetailsObject = { 'telephone': controls.telephone.value,
                                   'day': controls.day.value,
                                   'month': controls.month.value,
                                   'year': controls.year.value };
        this.userDetailsObjectStringfy = JSON.stringify(this.userDetailsObject);
        this.postUserDetails(this.userDetailsObjectStringfy, 'Section 3');

      } else if (part === 'part4' && controls.skills.controls) {

        // -- Update accordion panel states
        this.accordionPanelState(3, 4);

        // -- Sanitize input fields
        this.sanitizeInputForm(this.detailsForm, part);

        // -- Create object, stringfy it and post
        for (let i = 0; i < controls.skills.controls.length; i++) {
          if (controls.skills.controls[i].value.title !== '') {
            this.userDetailsObject[i] = {'skill': controls.skills.controls[i].value.title};
          }
        }

        this.userDetailsObjectStringfy = JSON.stringify(this.userDetailsObject);
        this.postUserDetails(this.userDetailsObjectStringfy, 'Section 4');

      } else if (part === 'part5' && controls.comments.value) {

        // -- Update accordion panel states
        this.sanitizeInputForm(this.detailsForm, part);

        // -- Create object, stringfy it and post
        this.userDetailsObject = { 'comments': controls.comments.value };
        this.userDetailsObjectStringfy = JSON.stringify(this.userDetailsObject);
        this.postUserDetails(this.userDetailsObjectStringfy, 'Section 5');

        // -- Display thant you page
        this.showConfirmationPage(controls);

      }
    }

    clearFields() {
      this.detailsForm.reset(this.detailsForm.controls.name);

      // -- Update accordion panel states
      this.accordionPanelState(4, 0);
    }

    accordionPanelState(previousPanel, nextPanel) {
      this.accordionItem[previousPanel].className = this.accordionItemCloseState;
      this.accordionItem[nextPanel].className = this.accordionItemOpenState;
    }

    sanitizeInputForm(form, step) {
      if (step === 'part1') {

        this.sanitizerService.sanitizeInput(form.controls['name'].value);
        this.sanitizerService.sanitizeInput(form.controls['surname'].value);
        this.sanitizerService.sanitizeInput(form.controls['email'].value);

      } else if (step === 'part2') {

        this.sanitizerService.sanitizeInput(form.controls['address'].value);

      } else if (step === 'part3') {

        this.sanitizerService.sanitizeInput(form.controls['telephone'].value);
        this.sanitizerService.sanitizeInput(form.controls['day'].value);
        this.sanitizerService.sanitizeInput(form.controls['month'].value);
        this.sanitizerService.sanitizeInput(form.controls['year'].value);

      } else if (step === 'part4') {

        for (let i = 0; i < form.controls.skills.controls.length; i++) {
          this.sanitizerService.sanitizeInput(form.controls.skills.controls[i].controls.title.value);
        }

      } else if (step === 'part5') {

        this.sanitizerService.sanitizeInput(form.controls['comments'].value);

      }
    }

    // -- Post data to JSONPlaceholder is a free online REST service that you can use whenever you need some fake data
    postUserDetails(userDetailsObjectStringfy, section) {
      this.postDetailsService.postDetails(userDetailsObjectStringfy)
      .subscribe(userDetailsResponseData => {

        this.isSuccessfullyPosted = true;
        this.sectionDetailsPosted = section;
        this.ref.detectChanges();

      }, err => {

        this.hasServiceFailed = true;
        this.ref.detectChanges();

      });
    }

    showConfirmationPage(controls) {
      this.submitted = true;
      this.setProfileData(controls);
      this.reduxStoreUpdateProfilePostalAddress();
      this.reduxStoreUpdateProfileTelephone();
      this.reduxStoreUpdateProfileDetails();
      this.reduxStoreUpdateProfileSkills();
      this.reduxStoreUpdateProfileComments();
    }

    setProfileData(controls) {
      if (this.profileId !== -1) {
        this.profileService.updateProfileData(controls, this.profileId);
        return false;
      } else {
        this.profileService.setProfileData(controls);
        return false;
      }
    }

    addNewSkill() {
      (<FormArray>this.detailsForm.get('skills')).push(
        new FormGroup({
          'title': new FormControl(null, [Validators.required, Validators.pattern('^(?=[a-zA-Z0-9])([A-Za-z0-9 \' -]*)+$')])
        })
      );
    }

    deleteSkill(index: number) {
      (<FormArray>this.detailsForm.get('skills')).removeAt(index);
    }


    reduxStoreUpdateProfilePostalAddress() {
      const postalAddress = {
        line1: this.detailsForm.controls['address'].value,
        line2: '',
        line3: '',
        line4: '',
        postcode: ''
      };
      this.customerProfileActions.updateCustomerProfile(postalAddress);
    }

    reduxStoreUpdateProfileTelephone() {
      const homePhoneNumber = this.detailsForm.controls['telephone'].value;
      this.customerProfileActions.updateContactHomePhoneSuccess(homePhoneNumber);
    }

    reduxStoreUpdateProfileDetails() {
      const personalDetails = {
        dateOfBirth: this.detailsForm.controls['day'].value + '/' +
                     this.detailsForm.controls['month'].value + '/' +
                     this.detailsForm.controls['year'].value,
        forename: this.detailsForm.controls['name'].value,
        gender: this.detailsForm.controls['gender'].value,
        surname: this.detailsForm.controls['surname'].value,
      };
      this.customerProfileActions.updatePersonalDetailsSuccess(personalDetails);
    }

    reduxStoreUpdateProfileSkills() {
      let skills = '';
      const controls = <FormArray>this.detailsForm.controls['skills'].value;
      for (let i = 0; i < controls.length; i++) {
        skills += controls[i].title + ',';
      }
      this.customerProfileActions.updateCandidateSkills(skills);
    }

    reduxStoreUpdateProfileComments() {
      const comments = this.detailsForm.controls['comments'].value;
      this.customerProfileActions.updateFinalComments(comments);
    }

}
