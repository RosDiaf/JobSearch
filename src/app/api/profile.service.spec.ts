import { TestBed, inject } from '@angular/core/testing';

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

  xit('should return profile object', inject([ProfileService], (service: ProfileService) => {
    const index = 0;
    service.getProfileData(index);
    expect(service.profile.length).toBeGreaterThan(0);
  }));
});
