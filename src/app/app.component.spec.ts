import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './api/auth.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavigationComponent
      ],
      imports: [
        RouterTestingModule,
      ],
      providers: [AuthService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
