import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo(link: string) {
    return browser.get(link);
  }

  getElement(selector: string) {
    return element(by.css(selector));
  }

  getParagraphText(selector: string) {
    return element(by.css(selector)).getText();
  }

  getAllElements(selector: string) {
    return element.all(by.css(selector));
  }

  getVideoImage(selector: string) {
    return element(by.css(selector)).getAttribute('src');
  }
}
