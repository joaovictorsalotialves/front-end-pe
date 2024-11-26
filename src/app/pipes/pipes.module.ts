import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PhonePipe } from './phone.pipe';
import { DatePipe } from './date.pipe';
import { CurrencyBRPipe } from './currency-br.pipe';

@NgModule({
  declarations: [
    PhonePipe,
    DatePipe,
    CurrencyBRPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PhonePipe,
    DatePipe,
    CurrencyBRPipe
  ]
})
export class PipesModule { }
