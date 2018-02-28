import { Routes, RouterModule } from '@angular/router';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthGuard } from './api/auth-guard.service';
import { AppComponent } from './app.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { DetailsComponent } from './details/details.component';
import { RolesComponent } from './roles/roles.component';
import { RoleDetailsComponent } from './role-details/role-details.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


// Route Configuration
const routes: Routes = [
  { path: '', component: AuthLoginComponent },
  { path: 'home', component: RolesComponent, canActivate: [AuthGuard] },
  { path: 'profiles', component: ProfilesComponent },
  { path: 'details', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'details/:id', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'apply/:roleid', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'role-details/:id', component: RoleDetailsComponent, canActivate: [AuthGuard] },
  { path: 'account-settings', component: AccountSettingsComponent, canActivate: [AuthGuard] },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];
export const routing = RouterModule.forRoot(routes, { useHash: true });
