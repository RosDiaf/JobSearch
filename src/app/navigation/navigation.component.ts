import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  responsiveNav: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  openNav() {
    this.responsiveNav = !this.responsiveNav;
  }

  onLogout() {
    this.authService.logout();
  }
}
