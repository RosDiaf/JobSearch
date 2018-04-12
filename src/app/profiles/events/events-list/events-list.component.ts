import { Component, OnInit } from '@angular/core';
import { events } from '../../../common/events';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  events = events;

  constructor() { }

  ngOnInit() {
  }

}
