import { TestBed, inject } from '@angular/core/testing';
import { Profile } from '../common/profile.model';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileService]
    });
  });

  it('should be created', inject([ProfileService], (service: ProfileService) => {
    expect(service).toBeTruthy();
  }));

  it('should return profile object', inject([ProfileService], (service: ProfileService) => {
    const index = 0;
    service.profile.push(
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
      '',
      'test comment'));

    service.getProfileData(index);
    expect(service.profile.length).toEqual(1);
  }));
});
