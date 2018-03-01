import { Component, OnInit } from '@angular/core';
import { insights } from '../../common/insights';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnInit {

  insights = insights;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  viewArticle(index) {
    this.router.navigateByUrl('page/' + index);
  }
}
