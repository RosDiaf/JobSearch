import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdvertsComponent } from './adverts/adverts.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EventsComponent } from './events/events.component';
import { InsightsComponent } from './insights/insights.component';
import { JobAlertComponent } from './job-alert/job-alert.component';
import { MyCvComponent } from './my-cv/my-cv.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { ProfilesComponent } from './profiles.component';
import { SlideshowComponent } from '../common/slideshow/slideshow.component';
import { ProfileService } from '../api/profile.service';
import { Profile } from '../common/profile.model';
import { ShortenPipe } from '../common/pipe/shorten.pipe';
import { FilterPipe } from '../common/pipe/filter.pipe';
import { Router, RouterModule } from '@angular/router';

import { NgRedux, select } from '@angular-redux/store';
import { CustomerProfileActions } from '../store/profileReducer/profileActions';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('ProfilesComponent', () => {
  let component: ProfilesComponent;
  let fixture: ComponentFixture<ProfilesComponent>;
  let service: ProfileService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdvertsComponent,
        ProfilesComponent,
        MyProfileComponent,
        InsightsComponent,
        JobAlertComponent,
        MyCvComponent,
        SlideshowComponent,
        EventsComponent,
        EventsListComponent,
        ShortenPipe,
        FilterPipe
      ],
      providers: [
        ProfileService,
        NgRedux,
        CustomerProfileActions,
        {provide: Router, useClass: RouterStub}],
      imports: [FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    service = new ProfileService();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove profile when \'delete\' button is clicked', () => {
    const profileTemp = [
      {
        name: 'Rosario',
        surname: 'Diaf',
        email: 'rosdiaf@gmail.com',
        address: '107 Maiden Lane Manhattan New York New York County New York United States 10038 ',
        telephone: '12345678900',
        day: '14',
        month: '02',
        year: '1973',
        skills: [
          {title: 'Javascript'},
          {title: 'Angular'}
        ],
        comments: 'test',
        roleID: 0
      }
    ];
    component.deleteProfile(0);
    expect(component.profileService.profile.length).toEqual(0);
  });

  it('should call Router.navigateByUrl("details/:id") with the ID of the form', inject([Router], (router: Router) => {
    const index = 0;
    const spy = spyOn(router, 'navigateByUrl');
    component.editProfile(index);
    const url = spy.calls.first().args[0];
    expect(url).toBe('details/0');
  }));
});
