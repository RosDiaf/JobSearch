import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML elements on DOM', () => {
    it('should append main container on DOM', () => {
      const elementAcc = fixture.debugElement.nativeElement.querySelector('#page-not-found');
      expect(elementAcc).not.toBeNull();
    });
    it('should h3 header container on DOM', () => {
      const elementAcc = fixture.debugElement.nativeElement.querySelector('#page-not-found h3');
      expect(elementAcc).not.toBeNull();
      expect(elementAcc.textContent).toContain('Page not found');
    });
    it('should p paragraph container on DOM', () => {
      const elementAcc = fixture.debugElement.nativeElement.querySelector('#page-not-found p');
      expect(elementAcc).not.toBeNull();
      expect(elementAcc.textContent).toContain('Sorry, an error has occured, Requested page not found!');
    });
  });
});
