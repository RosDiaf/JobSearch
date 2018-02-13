import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  activeCssClass = ' w3-border-red';
  tablinks = document.getElementsByClassName('tablink');

  constructor() {}

  ngOnInit() {
  }

  openTabContent(evt, tabName) {
    let i, x;
    x = document.getElementsByClassName('tab-content');
    for (i = 0; i < x.length; i++) {
       x[i].style.display = 'none';
    }
    for (i = 0; i < x.length; i++) {
       this.tablinks[i].className = this.tablinks[i].className.replace(this.activeCssClass, '');
    }
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.firstElementChild.className += this.activeCssClass;
  }
}
