import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  security: boolean;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  showContent(type) {
    switch (type) {
      case 'security':
      // this.router.navigateByUrl('page/' + type);
    }
  }
}
