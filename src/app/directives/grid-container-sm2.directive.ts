import { Directive } from '@angular/core';

@Directive({
  selector: '[appGridContainerSm2]',
  host: { 'class': 'grid sm:grid-cols-2 sm:gap-x-4' }
})
export class GridContainerSm2Directive { }
