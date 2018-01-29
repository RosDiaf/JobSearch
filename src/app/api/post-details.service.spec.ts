import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, BaseRequestOptions, ResponseOptions, RequestMethod} from '@angular/http';
import { PostDetailsService } from './post-details.service';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('PostDetailsService', () => {
  let subject: PostDetailsService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostDetailsService,
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

  beforeEach(inject([PostDetailsService, MockBackend], (PostDetailsService, mockBackend) => {
    subject = PostDetailsService;
    backend = mockBackend;
  }));

  it('should be created', inject([PostDetailsService], (service: PostDetailsService) => {
    expect(service).toBeTruthy();
  }));

  it('should post user details first section', () => {

    const userDetails = {
      firstName: 'Rosario',
      lastName: 'Diaferia',
      emailAddress: 'rosdiaf@aol.co.uk'
    };

    backend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toEqual(RequestMethod.Post);
        expect(connection.request.url).toContain('https://jsonplaceholder.typicode.com/posts');
        const options = new ResponseOptions({ body: userDetails });
        connection.mockRespond(new Response(options));
    });

    subject.postDetails(userDetails).subscribe((response) => {
      expect(response).toEqual(userDetails);
    });
  });

  it('should post user details second section', () => {

    const userDetails = {
      address: '107 Maiden Lane Manhattan New York New York County New York United States 10038'
    };

    backend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toEqual(RequestMethod.Post);
        expect(connection.request.url).toContain('https://jsonplaceholder.typicode.com/posts');
        const options = new ResponseOptions({ body: userDetails });
        connection.mockRespond(new Response(options));
    });

    subject.postDetails(userDetails).subscribe((response) => {
      expect(response).toEqual(userDetails);
    });
  });

  it('should post user details third section', () => {

    const userDetails = {
      telephone: '12345678900',
      day: '01',
      month: '12',
      year: '2017',
    };

    backend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toEqual(RequestMethod.Post);
        expect(connection.request.url).toContain('https://jsonplaceholder.typicode.com/posts');
        const options = new ResponseOptions({ body: userDetails });
        connection.mockRespond(new Response(options));
    });

    subject.postDetails(userDetails).subscribe((response) => {
      expect(response).toEqual(userDetails);
    });
  });

  it('should post user details fourth section', () => {

    const userDetails = {
      comments: 'Test comments'
    };

    backend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toEqual(RequestMethod.Post);
        expect(connection.request.url).toContain('https://jsonplaceholder.typicode.com/posts');
        const options = new ResponseOptions({ body: userDetails });
        connection.mockRespond(new Response(options));
    });

    subject.postDetails(userDetails).subscribe((response) => {
      expect(response).toEqual(userDetails);
    });
  });
});
