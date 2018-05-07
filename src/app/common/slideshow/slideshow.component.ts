import { Component, OnInit, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {

  @Input() upcomingEvents: any;
  slideIndex: number = 1;

  constructor(@Inject(DOCUMENT) document) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.showSlides(this.slideIndex);
  }

  public plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  public showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    if (n > slides.length) {this.slideIndex = 1} 
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    slides[this.slideIndex-1].style.display = "block";
  }
}
