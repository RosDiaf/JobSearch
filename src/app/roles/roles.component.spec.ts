import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RolesComponent } from './roles.component';
import { Router, RouterModule } from '@angular/router';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('RolesComponent', () => {
  let component: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesComponent ],
      providers: [{ provide: Router, useClass: RouterStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call Router.navigateByUrl("role-details/:id") with the ID of the form', inject([Router], (router: Router) => {
    const index = 0;
    const spy = spyOn(router, 'navigateByUrl');
    component.getDescription(index);
    const url = spy.calls.first().args[0];
    expect(url).toBe('role-details/0');
  }));
});
