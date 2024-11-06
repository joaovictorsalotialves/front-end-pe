import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlueButtonDirective } from './blue-button.directive';



@NgModule({
  declarations: [
    BlueButtonDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BlueButtonDirective
  ]
})
export class DirectivesModule { }
