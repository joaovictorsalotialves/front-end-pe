import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { PipesModule } from '../pipes/pipes.module';
import { AuthFlowContentComponent } from './auth-flow-content/auth-flow-content.component';
import { AuthFlowHeaderComponent } from './auth-flow-header/auth-flow-header.component';
import { GeneralButtonComponent } from './general-button/general-button.component';
import { InputFormComponent } from './input-form/input-form.component';
import { ItemMenuMobileComponent } from './side-menu-mobile/components/item-menu-mobile/item-menu-mobile.component';
import { SideMenuMobileComponent } from './side-menu-mobile/side-menu-mobile.component';
import { ItemMenuComponent } from './side-menu/components/item-menu/item-menu.component';
import { TitleSectionMenuComponent } from './side-menu/components/title-section-menu/title-section-menu.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

@NgModule({
  declarations: [
    AuthFlowHeaderComponent,
    AuthFlowContentComponent,
    InputFormComponent,
    GeneralButtonComponent,
    SideMenuComponent,
    ItemMenuComponent,
    TitleSectionMenuComponent,
    SideMenuMobileComponent,
    ItemMenuMobileComponent
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
    GeneralButtonComponent,
    SideMenuComponent,
    SideMenuMobileComponent,
    ItemMenuMobileComponent
  ]
})
export class ComponentsModule { }
