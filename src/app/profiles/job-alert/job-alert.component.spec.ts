import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { JobAlertComponent } from './job-alert.component';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('JobAlertComponent', () => {
  let component: JobAlertComponent;
  let fixture: ComponentFixture<JobAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobAlertComponent ],
      providers: [{ provide: Router, useClass: RouterStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('DOM nodes and contents', () => {
    it('should display h5 tag of the page', () => {
      const element = fixture.debugElement.nativeElement.querySelector('h5');
      expect(element).not.toBeNull();
    });

    it('should display envelope icon tag of the page', () => {
      const element = fixture.debugElement.nativeElement.querySelector('.fa-envelope');
      expect(element).not.toBeNull();
    });

    it('should display paragaph content', () => {
      const element = fixture.debugElement.nativeElement.querySelector('p');
      expect(element.textContent).toContain('Set up a targeted alert and be first to the latest jobs.');
    });

    it('should display button label', () => {
      const element = fixture.debugElement.nativeElement.querySelector('button');
      expect(element).not.toBeNull();
      expect(element.textContent).toEqual('Create Alert');
    });

    it('should navigate to the job alert form when \"Create Alert\ button is clicked" ', inject([Router], (router: Router) => {
      const spy = spyOn(router, 'navigateByUrl');
      component.showJobAlertForm();
      expect(spy).toHaveBeenCalled();
    }));
  });
});
