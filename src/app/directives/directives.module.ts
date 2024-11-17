import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonDirective } from './button.directive';
import { GridContainerSm2Directive } from './grid-container-sm2.directive';
import { InputDirective } from './input.directive';

@NgModule({
  declarations: [
    GridContainerSm2Directive,
    InputDirective,
    ButtonDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GridContainerSm2Directive,
    InputDirective,
    ButtonDirective
  ]
})
export class DirectivesModule { }
