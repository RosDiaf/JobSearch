import { Component, OnInit, Inject, Input, ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {

  @Input() upcomingEvents: any;
  slideIndex: number = 1;
  displaySlide: number;

  constructor(@Inject(DOCUMENT) document, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.displaySlide = 0;
    this.cdr.detectChanges();
  }

  public showSlide(id) {
    if (id <= this.upcomingEvents.length-1 && id >= 0) {
      this.displaySlide = id;
    }
  }
}
