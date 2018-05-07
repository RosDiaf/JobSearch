import { Component, OnInit } from '@angular/core';
import { upcomingEvents } from '../../common/events';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  upcomingEvents = upcomingEvents;

  constructor() { }

  ngOnInit() {
  }

}
