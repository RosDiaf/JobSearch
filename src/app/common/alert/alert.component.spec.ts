import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';
import { NO_ERRORS_SCHEMA, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { alert } from '../../common/alert.messages';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should append message to DOM if email form is submitted', () => {
    component.isSubmitted = true;
    fixture.detectChanges();
    const deSection1 = fixture.debugElement.queryAll(By.css('#panel'));
    const elSection1: HTMLElement = deSection1[0].nativeElement;
    expect(elSection1).not.toBeNull();
  });

  it('should display message enclosed in h3 tag if email form is submitted', () => {
    component.isSubmitted = true;
    component.message = alert.emailUpdatedSuccessfully;
    fixture.detectChanges();
    const deSection1 = fixture.debugElement.queryAll(By.css('#panel h3'));
    const elSection1: HTMLElement = deSection1[0].nativeElement;
    expect(elSection1.textContent).toEqual('Email successfully updated!');
  });
});
