import { Directive } from '@angular/core';

@Directive({
  selector: '[appBlueButton]',
  host: { class: '_blue-button text-center w-full h-12' }
})
export class BlueButtonDirective { }
