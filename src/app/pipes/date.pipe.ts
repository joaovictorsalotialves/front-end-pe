import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {
  transform(value: string | Date | null): string {
    if (!value) return '';

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      console.warn('Invalid date provided to dateFormat pipe:', value);
      return '';
    }

    return date.toISOString().split('T')[0];
  }
}
