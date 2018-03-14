import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cv',
  templateUrl: './my-cv.component.html',
  styleUrls: ['./my-cv.component.scss']
})
export class MyCvComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  showCVForm() {
    this.router.navigateByUrl('profiles/my-cv/form');
  }
}
