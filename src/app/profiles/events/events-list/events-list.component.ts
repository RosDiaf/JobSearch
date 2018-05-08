import { Component, OnInit } from '@angular/core';
import { events } from '../../../common/events';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  events = events;
  showAllEvents: boolean;
  eventBtnLabel: string;
  selectEventDisabled: boolean;

  constructor() { }

  ngOnInit() {
    this.eventBtnLabel = 'Show All';
  }

  showEventsList() {
    this.showAllEvents = !this.showAllEvents;
    if (this.showAllEvents) {
      this.eventBtnLabel = 'Hide All';
      this.selectEventDisabled = true;
    } else {
      this.eventBtnLabel = 'Show All';
      this.selectEventDisabled = false;
    }
  }

}
