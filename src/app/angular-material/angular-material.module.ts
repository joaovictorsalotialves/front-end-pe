import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule
  ],
  exports: [
    MatAutocompleteModule
  ]
})
export class AngularMaterialModule { }
