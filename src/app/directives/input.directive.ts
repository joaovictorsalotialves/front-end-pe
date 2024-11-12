import { Directive } from '@angular/core';

@Directive({
  selector: '[appInput]',
  host: { 'class': 'w-full p-3 pl-6 pr-12 h-12 border border-gray-300 rounded-[100px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' }
})
export class InputDirective {
}
