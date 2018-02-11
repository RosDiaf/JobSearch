import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-settings',
  templateUrl: './detail-settings.component.html',
  styleUrls: ['./detail-settings.component.scss']
})
export class DetailSettingsComponent implements OnInit {

  tabAccordion;

  constructor() { }

  ngOnInit() {
  }

  setAccordionStatus(id) {
    this.tabAccordion = document.getElementById(id);
    if (this.tabAccordion.className.indexOf("w3-show") === -1) {
      this.tabAccordion.className += " w3-show";
    } else { 
      this.tabAccordion.className = this.tabAccordion.className.replace(" w3-show", "");
    }
  }
}
