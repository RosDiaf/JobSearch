import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PageComponent } from './page.component';
import { insights } from '../common/insights';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageComponent ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: {'params': Observable.from([{'id': 0}])}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call Router.navigateByUrl("profiles")', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');
    component.backToProfile();
    expect(spy).toHaveBeenCalled();
  }));
});
