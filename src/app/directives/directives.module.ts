import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlueButtonDirective } from './blue-button.directive';
import { GridContainerSm2Directive } from './grid-container-sm2.directive';
import { InputDirective } from './input.directive';

@NgModule({
  declarations: [
    BlueButtonDirective,
    GridContainerSm2Directive,
    InputDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BlueButtonDirective,
    GridContainerSm2Directive,
    InputDirective
  ]
})
export class DirectivesModule { }
