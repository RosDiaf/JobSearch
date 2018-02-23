import { Component, OnInit } from '@angular/core';
import { constants } from '../common/constants';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {

  accountForm: FormGroup;
  isSubmitted: boolean;

  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              public router: Router) { 
    this.buildAccountForm();
  }

  ngOnInit() {
  }

  buildAccountForm() {
    this.accountForm = this.formBuilder.group({
      username: this.formBuilder.control(null, [Validators.required, Validators.pattern(constants.username)]),
      password: this.formBuilder.control(null, [Validators.required, Validators.pattern(constants.password)])
    })
  }

  onSubmit() {
    if(this.accountForm.valid) {
      this.authService.login();
      this.isSubmitted = true;
      this.router.navigateByUrl('profiles');
    }
  }
}
