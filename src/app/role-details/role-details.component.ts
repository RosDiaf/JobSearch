import { Component, OnInit } from '@angular/core';
import { positions } from '../common/positions';
import { Router } from '@angular/router';
import { ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})
export class RoleDetailsComponent implements OnInit {

  roleId: number;
  positions = positions;

  constructor(public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.roleId = Number.parseInt(params['id']);
    });
  }

  applyRole(roleId) {
    this.router.navigateByUrl('apply/' + roleId);
  }
}
