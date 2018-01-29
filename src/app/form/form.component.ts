import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgModel, FormArray } from '@angular/forms';
import { ProfileService } from '../api/profile.service';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() detailsForm;
  @Input() errorMessage;
  @Input() errorMessageDay;
  @Input() errorMessageMonth;
  @Input() errorMessageYear;
  @Input() formElementTypeName;
  @Input() formElementTypeSurname;
  @Input() formElementTypeEmail;
  @Input() formElementTypeTelephone;
  @Input() formElementTypeGender;
  @Input() formElementTypeDOB;
  @Input() formElementTypeSkills;
  @Input() formElementTypeComments;

  @Input() existingProfileName;
  @Input() existingProfileSurname;
  @Input() existingProfileEmail;
  @Input() existingProfileTelephone;
  @Input() existingProfileGender;
  @Input() existingProfileDay;
  @Input() existingProfileMonth;
  @Input() existingProfileYear;
  @Input() existingProfilecomments;
  @Input() existingProfileNewSkills = [];

  @Output() deleteSingleSkill: EventEmitter<any> = new EventEmitter<any>();

  existingSkills: any;

  @select(['customerProfile', 'customerData', 'personalDetails']) personalDetails: Observable<any>;
  @select(['customerProfile', 'customerData', 'contactDetails']) contactDetails: Observable<any>;

  constructor(public profileService: ProfileService) { }

  ngOnInit() {}

  deleteSkill(index: number) {
    this.deleteSingleSkill.emit(index);
  }
}
