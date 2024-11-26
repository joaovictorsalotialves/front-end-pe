import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyBR'
})
export class CurrencyBRPipe implements PipeTransform {
  transform(value: number | string | null, showSymbol: boolean = true): string {
    if (value === null || value === undefined || isNaN(+value)) {
      return 'R$ 0,00';
    }

    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(+value);

    return showSymbol ? formattedValue : formattedValue.replace('R$', '').trim();
  }
}
