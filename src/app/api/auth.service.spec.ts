import { TestBed, inject, ComponentFixture, async, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';
import { HttpModule, Http, Response, BaseRequestOptions, ResponseOptions, RequestMethod} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let subject: AuthService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (mockBackend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(mockBackend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }, ]
    });
  });

  beforeEach(inject([AuthService, MockBackend], (PostDetailsService, mockBackend) => {
    subject = PostDetailsService;
    backend = mockBackend;
  }));

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should login to application when account details are correct', () => {
    subject.loggedIn = false;
    subject.login();
    expect(subject.loggedIn).toBeTruthy();
  });

  it('should log out from application when logout method is called', () => {
    subject.loggedIn = true;
    subject.logout();
    expect(subject.loggedIn).toBeFalsy();
  });
});
