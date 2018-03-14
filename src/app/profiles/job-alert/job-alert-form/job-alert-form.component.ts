import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AlertComponent } from '../../../common/alert/alert.component';
import { alert } from '../../../common/alert.messages';

@Component({
  selector: 'app-job-alert-form',
  templateUrl: './job-alert-form.component.html',
  styleUrls: ['./job-alert-form.component.scss']
})
export class JobAlertFormComponent implements OnInit {

  alertForm: FormGroup;
  isSubmitted: boolean;
  alertCreatedSuccessfully: string;

  constructor(private formBuilder: FormBuilder) {
    this.buildAlertForm();
  }

  ngOnInit() {
  }

  buildAlertForm() {
    this.alertForm = this.formBuilder.group({
      keywords: this.formBuilder.control(null, [Validators.required, Validators.pattern('^(?=[a-zA-Z])([A-Za-z \' -]*)+$')]),
      contains1: this.formBuilder.control(null, [Validators.required]),
      locations: this.formBuilder.control(null, [Validators.required, Validators.pattern('^(?=[a-zA-Z])([A-Za-z \' -]*)+$')]),
      miles: this.formBuilder.control(null, [Validators.required]),
      jobTitle: this.formBuilder.control(null, [Validators.required, Validators.pattern('^(?=[a-zA-Z])([A-Za-z \' -]*)+$')]),
      contains2: this.formBuilder.control(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.alertForm.valid) {
      this.isSubmitted = true;
      this.alertCreatedSuccessfully = alert.alertCreatedSuccessfully;
    }
  }
}
