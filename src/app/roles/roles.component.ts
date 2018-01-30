import { Component, OnInit } from '@angular/core';
import { positions } from '../common/positions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  positions = positions;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  getDescription(roleId) {
    this.router.navigateByUrl('role-details/' + roleId);
  }
}
