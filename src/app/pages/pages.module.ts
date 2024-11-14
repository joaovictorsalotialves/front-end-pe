import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ComponentsModule } from '../components/components.module';
import { DirectivesModule } from '../directives/directives.module';
import { HomePageComponent } from './home-page/home-page.component';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RecoverPasswordPageComponent } from './recover-password-page/recover-password-page.component';
import { RegistrationEmployeePageComponent } from './registration-employee-page/registration-employee-page.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { UpdatePasswordPageComponent } from './update-password-page/update-password-page.component';

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
  ]
})
export class PagesModule { }
