import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { DetailsComponent } from './details/details.component';
import { RolesComponent } from './roles/roles.component';
import { RoleDetailsComponent } from './role-details/role-details.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


// Route Configuration
const routes: Routes = [
  {
    path: '',
    component: RolesComponent
  },
  {
    path: 'home',
    component: RolesComponent
  },
  {
    path: 'profiles',
    component: ProfilesComponent
  },
  {
    path: 'details',
    component: DetailsComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path: 'apply/:id',
    component: DetailsComponent
  },
  {
    path: 'role-details/:id',
    component: RoleDetailsComponent
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent
  }
];
export const routing = RouterModule.forRoot(routes, { useHash: true });
