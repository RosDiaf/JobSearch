import { Component, OnInit } from '@angular/core';
import { positions } from '../common/positions';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  positions = positions;

  constructor() { }

  ngOnInit() {
  }

}
