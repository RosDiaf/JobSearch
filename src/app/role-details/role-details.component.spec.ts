import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RoleDetailsComponent } from './role-details.component';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

const fakeActivatedRoute = {
  snapshot: { data: {  } }
} as ActivatedRoute;

describe('RoleDetailsComponent', () => {
  let component: RoleDetailsComponent;
  let fixture: ComponentFixture<RoleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleDetailsComponent ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'id': 1 }]) }}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call Router.navigateByUrl("apply/:id") with the ID of the form', inject([Router], (router: Router) => {
    const index = 0;
    const spy = spyOn(router, 'navigateByUrl');
    component.applyRole(index);
    const url = spy.calls.first().args[0];
    expect(url).toBe('apply/0');
  }));
});
