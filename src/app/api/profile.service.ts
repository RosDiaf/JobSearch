import { Injectable } from '@angular/core';
import { Profile } from '../common/profile.model';

@Injectable()
export class ProfileService {

  profile: Profile[] = [];

  constructor() { }

  setProfileData(controls, roleID) {
    this.profile.push(
      new Profile(
        controls.name.value,
        controls.surname.value,
        controls.email.value,
        controls.address.value,
        controls.telephone.value,
        controls.gender.value,
        controls.day.value,
        controls.month.value,
        controls.year.value,
        controls.skills.value,
        controls.comments.value,
        roleID
      )
    );
  }

  updateProfileData(controls, roleID, index) {
    this.profile.splice(index, 1,
      new Profile(
        controls.name.value,
        controls.surname.value,
        controls.email.value,
        controls.address.value,
        controls.telephone.value,
        controls.gender.value,
        controls.day.value,
        controls.month.value,
        controls.year.value,
        controls.skills.value,
        controls.comments.value,
        roleID
    ));
  }

  getProfileData(index) {
    return this.profile[index];
  }
}
