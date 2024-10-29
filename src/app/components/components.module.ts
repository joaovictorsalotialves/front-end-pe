import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { PipesModule } from '../pipes/pipes.module';
import { AuthFlowContentComponent } from './auth-flow-content/auth-flow-content.component';
import { AuthFlowHeaderComponent } from './auth-flow-header/auth-flow-header.component';
import { GeneralButtonComponent } from './general-button/general-button.component';
import { InputFormComponent } from './input-form/input-form.component';

@NgModule({
  declarations: [
    AuthFlowHeaderComponent,
    AuthFlowContentComponent,
    InputFormComponent,
    GeneralButtonComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    PipesModule
  ],
  exports: [
    PipesModule,
    AuthFlowHeaderComponent,
    AuthFlowContentComponent,
    InputFormComponent,
    GeneralButtonComponent
  ]
})
export class ComponentsModule { }
