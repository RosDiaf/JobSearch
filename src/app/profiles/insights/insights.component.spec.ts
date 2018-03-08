import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { InsightsComponent } from './insights.component';
import { Router, RouterModule } from '@angular/router';
import { insights } from '../../common/insights';

class RouterStab {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('InsightsComponent', () => {
  let component: InsightsComponent;
  let fixture: ComponentFixture<InsightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsightsComponent ],
      providers: [{provide: Router, useClass: RouterStab }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Router', () => {
    it('should call Router.navigateByUrl("page/:id") with the ID of the article', inject([Router], (router: Router) => {
      const index = 0;
      const spy = spyOn(router, 'navigateByUrl');
      component.viewArticle(index);
      const url = spy.calls.first().args[0];
      expect(url).toBe('page/0');
    }));
  });

  describe('DOM nodes and contents', () => {
    it('should display h4 tag of the page', () => {
      const element = fixture.debugElement.nativeElement.querySelector('h4.strong');
      expect(element).not.toBeNull();
      expect(element.textContent).toContain('Latest Insights');
    });

    describe('Article headers', () => { 
      it('should display header of the article 1', () => {
        const element = fixture.debugElement.nativeElement.querySelector('#latest_0');
        expect(element).not.toBeNull();
        expect(element.textContent).toContain(insights[0].title);
      });

      it('should display header of the article 2', () => {
        const element = fixture.debugElement.nativeElement.querySelector('#latest_1');
        expect(element).not.toBeNull();
        expect(element.textContent).toContain(insights[1].title);
      });

      it('should display header of the article 3', () => {
        const element = fixture.debugElement.nativeElement.querySelector('#latest_2');
        expect(element).not.toBeNull();
        expect(element.textContent).toContain(insights[2].title);
      });

      it('should display header of the article 4', () => {
        const element = fixture.debugElement.nativeElement.querySelector('#latest_3');
        expect(element).not.toBeNull();
        expect(element.textContent).toContain(insights[3].title);
      });

      it('should display header of the article 5', () => {
        const element = fixture.debugElement.nativeElement.querySelector('#latest_4');
        expect(element).not.toBeNull();
        expect(element.textContent).toContain(insights[4].title);
      });

      it('should not display header of the article if wrong article id', () => {
        const element = fixture.debugElement.nativeElement.querySelector('#latest_0');
        expect(element).not.toBeNull();
        expect(element.textContent).not.toContain(insights[1].title);
      });
    });
  });
});
