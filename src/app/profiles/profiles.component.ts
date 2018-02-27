import { Component, OnInit } from '@angular/core';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ProfileService } from '../api/profile.service';
import { Router } from '@angular/router';
import { positions } from '../common/positions';

// -- Redux
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { CustomerProfileActions } from '../store/profileReducer/profileActions';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  @select(['customerProfile', 'customerData', 'userAccoutDetails']) userAccountDetails: Observable<any>;
  @select(['customerProfile', 'customerData', 'personalDetails']) personalDetails: Observable<any>;
  @select(['customerProfile', 'customerData', 'contactDetails']) contactDetails: Observable<any>;

  positions = positions;

  constructor(public profileService: ProfileService,
              public router: Router,
              private customerProfileActions: CustomerProfileActions) {}

  ngOnInit() {
  }

  editProfile(index: number) {
    this.router.navigateByUrl('details/' + index);
  }

  deleteProfile(index: number) {
    if (index !== -1) {
      this.profileService.profile.splice(index, 1);
    }
  }
}
