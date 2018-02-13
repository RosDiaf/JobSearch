import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AlertComponent } from '../common/alert/alert.component';
import { alert } from '../common/alert.messages';

@Component({
  selector: 'app-detail-settings',
  templateUrl: './detail-settings.component.html',
  styleUrls: ['./detail-settings.component.scss']
})
export class DetailSettingsComponent implements OnInit {

  emailUpdateForm: FormGroup;
  isSubmitted: boolean;
  emailUpdatedSuccessfully: string;
  tabAccordion;

  constructor(private formBuilder: FormBuilder) {
    this.buildEmailUpdateForm();
  }

  ngOnInit() {
  }

  buildEmailUpdateForm() {
    this.emailUpdateForm = this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required,
        Validators.pattern('^[a-zA-Z]+[a-zA-Z0-9_#\'\\?`\\.{}-]*@[a-zA-Z]+[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[A-Za-z]{2,})$')]),
      password: this.formBuilder.control(null, [Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,}).+$')]),
    });
  }

  setAccordionStatus(id) {
    this.tabAccordion = document.getElementById(id);
    if (this.tabAccordion.className.indexOf('w3-show') === -1) {
      this.tabAccordion.className += ' w3-show';
    } else {
      this.tabAccordion.className = this.tabAccordion.className.replace(' w3-show', '');
    }
  }

  onSubmit() {
    if (this.emailUpdateForm.valid) {
      this.isSubmitted = true;
      this.emailUpdatedSuccessfully = alert.emailUpdatedSuccessfully;
    }
  }
}
