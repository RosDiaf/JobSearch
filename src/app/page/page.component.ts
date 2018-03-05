import { Component, OnInit } from '@angular/core';
import { insights } from '../common/insights';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  contentId: number;
  insights = insights;

  constructor(public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contentId = Number.parseInt(params['id']);
    });
  }

  backToProfile() {
    this.router.navigateByUrl('profiles');
  }
}
