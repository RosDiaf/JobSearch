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

  describe('DOM nodes and contents', () => {
    it('should display h1 tag of the page', () => {
      const element = fixture.debugElement.nativeElement.querySelector('h1');
      expect(element).not.toBeNull();
      expect(element.textContent).toContain(insights[0].title);
    });

    it('should display p tag of the page', () => {
      const element = fixture.debugElement.nativeElement.querySelector('p');
      expect(element).not.toBeNull();
      expect(element.textContent).toContain(insights[0].author);
    });

    it('should display img tag of the page', () => {
      const element = fixture.debugElement.nativeElement.querySelector('img');
      expect(element).not.toBeNull();
    });

    it('should display article content', () => {
      const element = fixture.debugElement.nativeElement.querySelector('#article_0');
      expect(element).not.toBeNull();
      expect(element.textContent).toContain('Tech pros who interact in any way with cybersecurity will face a new');
    });
  });
});
