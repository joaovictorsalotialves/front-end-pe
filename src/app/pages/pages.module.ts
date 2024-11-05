import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ComponentsModule } from '../components/components.module';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RecoverPasswordPageComponent } from './recover-password-page/recover-password-page.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    RecoverPasswordPageComponent,
    ResetPasswordPageComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    ComponentsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoginPageComponent,
    RecoverPasswordPageComponent,
    ResetPasswordPageComponent,
    HomePageComponent,
  ]
})
export class PagesModule { }
