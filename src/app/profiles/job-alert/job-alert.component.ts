import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-alert',
  templateUrl: './job-alert.component.html',
  styleUrls: ['./job-alert.component.scss']
})
export class JobAlertComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  showJobAlertForm() {
    this.router.navigateByUrl('profiles/job-alert/form');
  }
}
