import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailSettingsComponent } from './detail-settings.component';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';

describe('DetailSettingsComponent', () => {
  let component: DetailSettingsComponent;
  let fixture: ComponentFixture<DetailSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Accordion status', () => {
    it('should show \"change email\" content when tab is clicked', () => {
      component.tabAccordion = 'section1';
      component.setAccordionStatus('section1');

      const deSection1 = fixture.debugElement.queryAll(By.css('#section1'));
      const elSection1: HTMLElement = deSection1[0].nativeElement;
      expect(elSection1.className).toEqual('w3-container w3-hide w3-show');

      const deSection2 = fixture.debugElement.queryAll(By.css('#section2'));
      const elSection2: HTMLElement = deSection2[0].nativeElement;
      expect(elSection2.className).toEqual('w3-container w3-hide');
    });

    it('should show \"change password\" content when tab is clicked', () => {
      component.tabAccordion = 'section2';
      component.setAccordionStatus('section2');

      const deSection1 = fixture.debugElement.queryAll(By.css('#section1'));
      const elSection1: HTMLElement = deSection1[0].nativeElement;
      expect(elSection1.className).toEqual('w3-container w3-hide');

      const deSection2 = fixture.debugElement.queryAll(By.css('#section2'));
      const elSection2: HTMLElement = deSection2[0].nativeElement;
      expect(elSection2.className).toEqual('w3-container w3-hide w3-show');
    });

    it('should hide \"change email\" content when tab is clicked', () => {
      component.tabAccordion = 'section1';
      const deSection1 = fixture.debugElement.queryAll(By.css('#section1'));
      const elSection1: HTMLElement = deSection1[0].nativeElement;
      elSection1.className = 'w3-container w3-show';
      component.setAccordionStatus('section1');
      expect(elSection1.className).toEqual('w3-container');
    });

    it('should hide \"change password\" content when tab is clicked', () => {
      component.tabAccordion = 'section2';
      const deSection1 = fixture.debugElement.queryAll(By.css('#section2'));
      const elSection1: HTMLElement = deSection1[0].nativeElement;
      elSection1.className = 'w3-container w3-show';
      component.setAccordionStatus('section2');
      expect(elSection1.className).toEqual('w3-container');
    });
  });

  describe('Accrodion settings labels', () => {
    it('should contain \"change email\" label', () => {
      const elementAcc = fixture.debugElement.nativeElement.querySelector('#tab1');
      expect(elementAcc.textContent).toContain('Change Email Address');
    });

    it('should contain \"change password\" label', () => {
      const elementAcc = fixture.debugElement.nativeElement.querySelector('#tab2');
      expect(elementAcc.textContent).toContain('Change Password');
    });
  });
});
