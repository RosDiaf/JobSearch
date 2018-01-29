import { browser, by, element, ElementFinder, protractor } from 'protractor';
import { AppPage } from './app.po';

describe('my-form App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  describe('Heading elements on the accordion', function() {
    it('should display container for accordion item heading', () => {
        page.navigateTo('/');
        expect(page.getElement('app-root .accordionItemHeading').isDisplayed()).toBeTruthy();
    });

    it('should display accordion item heading saying Step 1: Your details', () => {
        page.navigateTo('/');
        expect(page.getParagraphText('app-root #step1')).toEqual('Step 1: Your details');
    });

    it('should display accordion item heading saying Step 2: Your address', () => {
      page.navigateTo('/');
      expect(page.getParagraphText('app-root #step2')).toEqual('Step 2: Your address');
    });

    it('should display accordion item heading saying Step 3: More comments', () => {
      page.navigateTo('/');
      expect(page.getParagraphText('app-root #step3')).toEqual('Step 3: More comments');
    });

    it('should display accordion item content element', () => {
      page.navigateTo('/');
      expect(page.getElement('app-root .accordionItemContent').isDisplayed()).toBeTruthy();
    });
  });

  describe('form elements on the accordion', function() {
    it('should display form group container and form elements for accordion item opened', () => {
      page.navigateTo('/');
      expect(page.getElement('app-root .formGroup').isDisplayed()).toBeTruthy();
      expect(page.getElement('app-root .formGroup #name').isDisplayed()).toBeTruthy();
      expect(page.getElement('app-root .formGroup #surname').isDisplayed()).toBeTruthy();
      expect(page.getElement('app-root .formGroup #email').isDisplayed()).toBeTruthy();
    });

    it('should not display form group container and form elements for accordion item closed', () => {
      page.navigateTo('/');
      expect(page.getElement('app-root .formGroup #telephone').isPresent()).toBeTruthy();
      expect(page.getElement('app-root .formGroup #gender').isPresent()).toBeTruthy();
      expect(page.getElement('app-root .formGroup #dateOfBirth').isPresent()).toBeTruthy();
      expect(page.getElement('app-root .formGroup #comments').isPresent()).toBeTruthy();
    });

    it('should complete the first part of the form', () => {
      page.navigateTo('/');

      const name = page.getElement('#name');
      const surname = page.getElement('#surname');
      const email = page.getElement('#email');
      const search_places = page.getElement('#search_places');
      const telephone = page.getElement('#telephone');
      const day = page.getElement('#day');
      const month = page.getElement('#month');
      const year = page.getElement('#year');
      const nextButtonPart1 = page.getElement('#part1');
      const nextButtonPart3 = page.getElement('#part3');

      name.sendKeys('Rosario');
      surname.sendKeys('Diaferia');
      email.sendKeys('rosdiaf@aol.com');
      nextButtonPart1.click();
      expect(page.getElement('app-root #step2').isDisplayed()).toBeTruthy();
    });
  });
});
