import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AlertComponent } from '../../../common/alert/alert.component';
import { alert } from '../../../common/alert.messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cv-form',
  templateUrl: './my-cv-form.component.html',
  styleUrls: ['./my-cv-form.component.scss']
})
export class MyCvFormComponent implements OnInit {

  cvForm: FormGroup;
  isSubmitted: boolean;
  cvUploadedSuccessfully: string;
  fileSelected: boolean;
  fileTypeNotSupported: string;
  selectFromDropDown: boolean;

  constructor(private formBuilder: FormBuilder, public router: Router) {
    this.buildCVForm();
  }

  ngOnInit() {
  }

  buildCVForm() {
    this.cvForm = this.formBuilder.group({
      file: this.formBuilder.control(null, [Validators.required]),
      status: this.formBuilder.control(null, [Validators.required]),
      permanent: this.formBuilder.control(null, [Validators.required]),
      contract: this.formBuilder.control(null, [Validators.required]),
      temporary: this.formBuilder.control(null, [Validators.required]),
      partTime: this.formBuilder.control(null, [Validators.required]),
      salaryType: this.formBuilder.control(null, [Validators.required]),
      salaryFrom: this.formBuilder.control(null, [Validators.required, Validators.pattern('(20000|30000)$')]),
      salaryTo: this.formBuilder.control(null, [Validators.required, , Validators.pattern('(30000|40000)$')])
    });
  }

  get status() {
    return this.cvForm.get('status');
  }

  get permanent() {
    return this.cvForm.get('permanent');
  }

  get contract() {
    return this.cvForm.get('contract');
  }

  get temporary() {
    return this.cvForm.get('temporary');
  }

  get partTime() {
    return this.cvForm.get('partTime');
  }

  get salaryType() {
    return this.cvForm.get('salaryType');
  }

  onChange(event) {
    const file = event.srcElement.files;
    if (!this.validateFile(file[0].name)) {
      this.fileSelected = false;
      this.fileTypeNotSupported = alert.fileTypeNotSupported;
    } else {
      this.fileSelected = file.length > 0;
    }
  }

  validateFile(name: String) {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() === 'doc' ||
          ext.toLowerCase() === 'docx' ||
            ext.toLowerCase() === 'pdf' ||
              ext.toLowerCase() === 'rtf') {
        return true;
    } else {
        return false;
    }
  }

  onSubmit() {
    const cvForm = this.cvForm;
    if (this.fileSelected &&
          this.validateInputField() &&
            this.validateSelectDropDownOption()) {

              this.isSubmitted = true;
              this.cvUploadedSuccessfully = alert.cvUploadedSuccessfully;
    } else {
      return false;
    }
  }

  validateInputField() {
    const cvForm = this.cvForm;
    if (cvForm.controls['status'].valid &&
        (cvForm.controls['permanent'].valid
          || cvForm.controls['contract'].valid
            || cvForm.controls['temporary'].valid
              || cvForm.controls['partTime'].valid)
                && cvForm.controls['salaryType'].valid) {

      return true;
    } else {
      return false;
    }
  }

  validateSelectDropDownOption() {
    const cvForm = this.cvForm;
    if (cvForm.controls['salaryFrom'].invalid || cvForm.controls['salaryTo'].invalid) {
      this.selectFromDropDown = true;
      return false;
    } else {
      this.selectFromDropDown = false;
      return true;
    }
  }

  back() {
    this.router.navigateByUrl('/profiles');
  }
}
