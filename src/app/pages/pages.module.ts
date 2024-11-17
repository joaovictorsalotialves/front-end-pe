import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ComponentsModule } from '../components/components.module';
import { DirectivesModule } from '../directives/directives.module';
import { LoginPageComponent } from './auth-flow/login-page/login-page.component';
import { RecoverPasswordPageComponent } from './auth-flow/recover-password-page/recover-password-page.component';
import { ResetPasswordPageComponent } from './auth-flow/reset-password-page/reset-password-page.component';
import { RegistrationEmployeePageComponent } from './employee/registration-employee-page/registration-employee-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { LogoutPageComponent } from './profile/logout-page/logout-page.component';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { UpdatePasswordPageComponent } from './profile/update-password-page/update-password-page.component';
import { RegistrationUserPageComponent } from './user/registration-user-page/registration-user-page.component';
import { RegistrationDonationCategoryPageComponent } from './donation-category/registration-donation-category-page/registration-donation-category-page.component';
import { ViewEmployeePageComponent } from './employee/view-employee-page/view-employee-page.component';
import { DetailEmployeePageComponent } from './employee/detail-employee-page/detail-employee-page.component';
import { DetailUserPageComponent } from './user/detail-user-page/detail-user-page.component';
import { ViewUserPageComponent } from './user/view-user-page/view-user-page.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    RecoverPasswordPageComponent,
    ResetPasswordPageComponent,
    HomePageComponent,
    LayoutPageComponent,
    LogoutPageComponent,
    ProfilePageComponent,
    UpdatePasswordPageComponent,
    RegistrationEmployeePageComponent,
    RegistrationUserPageComponent,
    RegistrationDonationCategoryPageComponent,
    ViewEmployeePageComponent,
    DetailEmployeePageComponent,
    DetailUserPageComponent,
    ViewUserPageComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    ComponentsModule,
    DirectivesModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoginPageComponent,
    RecoverPasswordPageComponent,
    ResetPasswordPageComponent,
    HomePageComponent,
    LogoutPageComponent,
    ProfilePageComponent,
    UpdatePasswordPageComponent,
    RegistrationEmployeePageComponent,
    RegistrationUserPageComponent,
    RegistrationDonationCategoryPageComponent,
    ViewEmployeePageComponent,
    DetailEmployeePageComponent,
    DetailUserPageComponent,
    ViewUserPageComponent,
  ]
})
export class PagesModule { }
