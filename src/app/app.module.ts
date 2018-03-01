import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertComponent } from './common/alert/alert.component';
import { AddressComponent } from './address/address.component';
import { AppComponent } from './app.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { constants } from './common/constants';
import { HttpModule, Http, Response} from '@angular/http';
import { ProfileService } from './api/profile.service';
import { PostDetailsService } from './api/post-details.service';
import { routing } from './app.routes';
import { SanitizerService } from './common/sanitizer';

// -- Google Api
import { AgmCoreModule } from '@agm/core';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';

// -- Ngx Pipes
import { NgPipesModule } from 'ngx-pipes';

import { FormComponent } from './form/form.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DetailsComponent } from './details/details.component';
import { RolesComponent } from './roles/roles.component';
import { RoleDetailsComponent } from './role-details/role-details.component';
import { MyProfileComponent } from './profiles/my-profile/my-profile.component';

// -- Redux
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer } from './store/rootReducer';
import { CustomerProfileActions } from './store/profileReducer/profileActions';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DetailSettingsComponent } from './detail-settings/detail-settings.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// -- Auth Guard
import { AuthService } from './api/auth.service';
import { AuthGuard } from './api/auth-guard.service';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationComponent,
    AlertComponent,
    AddressComponent,
    FormComponent,
    ProfilesComponent,
    NavigationComponent,
    DetailsComponent,
    RolesComponent,
    RoleDetailsComponent,
    AccountSettingsComponent,
    DetailSettingsComponent,
    PageNotFoundComponent,
    AuthLoginComponent,
    MyProfileComponent,
    FooterComponent
  ],
  imports: [
    routing,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgReduxModule,
    NgPipesModule,
    Ng4GeoautocompleteModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: constants.API_KEY
    })
  ],
  providers: [PostDetailsService,
              SanitizerService,
              ProfileService,
              CustomerProfileActions,
              AuthService,
              AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<any>,
    devTools: DevToolsExtension
  ) {
    const devtoolInstalled = !!window['__REDUX_DEVTOOLS_EXTENSION__'];
    const enhancers = (isDevMode() && devtoolInstalled) ? [devTools.enhancer()] : [];
    ngRedux.configureStore(rootReducer, {}, [], enhancers);
  }
}

