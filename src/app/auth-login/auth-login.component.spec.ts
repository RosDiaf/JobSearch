import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthLoginComponent } from './auth-login.component';
import { AuthService } from '../api/auth.service';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('AuthLoginComponent', () => {
  let component: AuthLoginComponent;
  let fixture: ComponentFixture<AuthLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthLoginComponent ],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [AuthService, {provide: Router, useClass: RouterStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submit form', () => {
    let form;
    beforeEach(() => {
      form = {
        controls: {
          username: {
            errors: { pattern: false },
            value: 'rosdiaf',
            valid: true
          },
          password: {
            errors: { pattern: false },
            value: 'ros123',
            valid: true
          },
        }
      };
    });

    it('should submit the form if login details are valid', inject([Router], (router: Router) => {
      component.accountForm.controls['username'].setValue('rosdiaf');
      component.accountForm.controls['password'].setValue('ros123');
      const authService = TestBed.get(AuthService);
      const spy = spyOn(router, 'navigateByUrl');
      const spyAuthService = spyOn(authService, 'login');
      component.onSubmit();
      expect(component.isSubmitted).toBeTruthy();
      expect(spy).toHaveBeenCalled();
      expect(spyAuthService).toHaveBeenCalled();
    }));

    it('should not submit the form if login details are not valid', inject([Router], (router: Router) => {
      component.accountForm.controls['username'].setValue('rosdiaf**');
      component.accountForm.controls['password'].setValue('ros123567');
      const authService = TestBed.get(AuthService);
      const spy = spyOn(router, 'navigateByUrl');
      const spyAuthService = spyOn(authService, 'login');
      component.onSubmit();
      expect(component.isSubmitted).toBeFalsy();
      expect(spy).not.toHaveBeenCalled();
      expect(spyAuthService).not.toHaveBeenCalled();
    }));
  });
});
