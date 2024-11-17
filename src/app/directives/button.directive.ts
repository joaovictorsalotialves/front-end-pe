import { Directive, ElementRef, inject, Input, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appButton]',
  host: { 'class': 'font-bold text-lg sm:text:base tracking-widest text-center w-full h-12' }
})
export class ButtonDirective {
  @Input('appButton') colorType: 'blue' | 'red' = 'blue';

  private readonly _el = inject(ElementRef);
  private readonly _renderer = inject(Renderer2);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['colorType']) {
      this.updateButtonClass();
    }
  }

  private updateButtonClass() {
    this._renderer.removeClass(this._el.nativeElement, '_blue-button');
    this._renderer.removeClass(this._el.nativeElement, '_red-button');

    const classToAdd = this.colorType === 'red' ? '_red-button' : '_blue-button';
    this._renderer.addClass(this._el.nativeElement, classToAdd);
  }
}
