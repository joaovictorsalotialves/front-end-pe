import { Directive } from '@angular/core';

@Directive({
  selector: '[appBlueButton]',
  host: { class: '_blue-button font-bold text-lg sm:text:base tracking-widest text-center w-full h-12' }
})
export class BlueButtonDirective { }
