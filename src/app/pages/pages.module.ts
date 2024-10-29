import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ComponentsModule } from '../components/components.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { RecoverPasswordPageComponent } from './recover-password-page/recover-password-page.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    RecoverPasswordPageComponent,
    ResetPasswordPageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  exports: [
    ComponentsModule,
    AngularMaterialModule,
    HttpClientModule,
    LoginPageComponent,
    RecoverPasswordPageComponent,
    ResetPasswordPageComponent,
  ]
})
export class PagesModule { }
