import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCvFormComponent } from './my-cv-form.component';

describe('MyCvFormComponent', () => {
  let component: MyCvFormComponent;
  let fixture: ComponentFixture<MyCvFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCvFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
