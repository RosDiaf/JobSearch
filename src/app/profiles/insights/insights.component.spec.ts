import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { InsightsComponent } from './insights.component';
import { Router, RouterModule } from '@angular/router';

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
});
