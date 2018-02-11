import { TestBed, inject } from '@angular/core/testing';
import { Profile } from '../common/profile.model';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileService]
    });
  });

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
        gender: {
          errors: { pattern: false },
          value: 'male',
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
              value: {
                title: 'JavaScript'
              },
            },
            {
              value: {
                title: 'Angular'
              },
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
      '[{"skill":"JavaScript"},{"skill":"Angular"}]',
      'test comment'));
    service.getProfileData(index);
    expect(service.profile.length).toEqual(1);
  }));

  it('should add profile data object to profile array', inject([ProfileService], (service: ProfileService) => {
    service.setProfileData(form.controls);
    expect(service.profile.length).toEqual(1);

    service.profile.push(
      new Profile(
      'Lebron',
      'James',
      'rd@test.com',
      '1 High road N1',
      '12345678900',
      'male',
      14,
      2,
      1973,
      '[{"skill":"JavaScript"},{"skill":"Angular"}]',
      'test comment'));

      expect(service.profile.length).toEqual(2);
  }));

  it('should remove profile data object from profile array', inject([ProfileService], (service: ProfileService) => {
    service.profile.push(
      new Profile(
      'John',
      'Wall',
      'rd@test.com',
      '1 High road N1',
      '12345678900',
      'male',
      14,
      2,
      1973,
      '[{"skill":"JavaScript"},{"skill":"Angular"}]',
      'test comment'));
    service.updateProfileData(form.controls, 1);
    service.profile.splice(0, 1);
    expect(service.profile.length).toEqual(1);
  }));
});
