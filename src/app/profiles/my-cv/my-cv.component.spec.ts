import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MyCvComponent } from './my-cv.component';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('MyCvComponent', () => {
  let component: MyCvComponent;
  let fixture: ComponentFixture<MyCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCvComponent ],
      providers: [{provide: Router, useClass: RouterStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the job alert form when \"Upload CV\ button is clicked" ', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');
    component.showCVForm();
    expect(spy).toHaveBeenCalled();
  }));

  describe('DOM nodes and contents', () => {
    it('should display h5 tag of the page', () => {
      const element = fixture.debugElement.nativeElement.querySelector('h5');
      expect(element).not.toBeNull();
      expect(element.textContent).toEqual('Smart');
    });

    it('should display envelope icon tag of the page', () => {
      const element = fixture.debugElement.nativeElement.querySelector('.fa-envelope');
      expect(element).not.toBeNull();
    });

    it('should display paragaph content', () => {
      const element = fixture.debugElement.nativeElement.querySelector('p');
      expect(element.textContent).toContain('Don\'t just find. Be found. Put your CV in front of great employers.');
    });

    it('should display button label', () => {
      const element = fixture.debugElement.nativeElement.querySelector('button');
      expect(element).not.toBeNull();
      expect(element.textContent).toEqual('Upload CV');
    });
  });
});
