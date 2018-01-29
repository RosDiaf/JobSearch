import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ConfirmationComponent } from './confirmation.component';

describe('ConfirmationComponent', () => {
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display thank you message when confirmation page is loaded', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.header').textContent).not.toBeNull();
    expect(compiled.querySelector('.header').textContent).toEqual('Thank you!');
  });

  it('should display message when confirmation page is loaded', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.message').textContent).not.toBeNull();
    expect(compiled.querySelector('.message').textContent).toContain('Your submission is received and we will contact you soon.');
  });

  it('should display table headers when loading table', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#first-header').textContent).not.toBeNull();
    expect(compiled.querySelector('#second-header').textContent).not.toBeNull();
    expect(compiled.querySelector('#third-header').textContent).not.toBeNull();
    expect(compiled.querySelector('#fourth-header').textContent).not.toBeNull();
    expect(compiled.querySelector('#fifth-header').textContent).not.toBeNull();
    expect(compiled.querySelector('#sixth-header').textContent).not.toBeNull();
  });

  it('should display header titles when loading table', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#first-header').textContent).toEqual('Name');
    expect(compiled.querySelector('#second-header').textContent).toEqual('Surname');
    expect(compiled.querySelector('#third-header').textContent).toEqual('Email');
    expect(compiled.querySelector('#fourth-header').textContent).toEqual('Telephone');
    expect(compiled.querySelector('#fifth-header').textContent).toEqual('Date of birth');
    expect(compiled.querySelector('#sixth-header').textContent).toEqual('Comments');
  });
});
