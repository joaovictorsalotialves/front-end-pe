import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string | number | null): string {
    if (!value) {
      return '-'
    }
    const phone = value.toString().replace(/\D/g, '');

    if (phone.length === 10) {
      return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (phone.length === 11) {
      return phone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2$3-$4');
    } else {
      return value.toString();
    }
  }
}
