import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { AuthFlowContentComponent } from './auth-flow-content/auth-flow-content.component';
import { AuthFlowHeaderComponent } from './auth-flow-header/auth-flow-header.component';
import { AutocompleteFormComponent } from './autocomplete-form/autocomplete-form.component';
import { CardViewComponent } from './card-view/card-view.component';
import { CardComponent } from './card/card.component';
import { GeneralButtonComponent } from './general-button/general-button.component';
import { InputFormComponent } from './input-form/input-form.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { ItemMenuMobileComponent } from './side-menu-mobile/components/item-menu-mobile/item-menu-mobile.component';
import { LineMenuMobileComponent } from './side-menu-mobile/components/line-menu-mobile/line-menu-mobile.component';
import { SideMenuMobileComponent } from './side-menu-mobile/side-menu-mobile.component';
import { ItemMenuComponent } from './side-menu/components/item-menu/item-menu.component';
import { TitleSectionMenuComponent } from './side-menu/components/title-section-menu/title-section-menu.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SubheaderComponent } from './subheader/subheader.component';
import { CardReportComponent } from './card-report/card-report.component';

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
    ItemMenuMobileComponent,
    MainHeaderComponent,
    LineMenuMobileComponent,
    CardComponent,
    SubheaderComponent,
    AutocompleteFormComponent,
    CardViewComponent,
    CardReportComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    DirectivesModule,
    NgxMaskDirective,
  ],
  exports: [
    PipesModule,
    NgxMaskDirective,

    AuthFlowHeaderComponent,
    AuthFlowContentComponent,
    InputFormComponent,
    GeneralButtonComponent,
    SideMenuComponent,
    SideMenuMobileComponent,
    ItemMenuMobileComponent,
    MainHeaderComponent,
    CardComponent,
    SubheaderComponent,
    AutocompleteFormComponent,
    CardViewComponent,
    CardReportComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideNgxMask()
  ]
})
export class ComponentsModule { }
