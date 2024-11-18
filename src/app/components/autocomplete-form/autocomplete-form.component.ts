import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-autocomplete-form',
  templateUrl: './autocomplete-form.component.html',
  styleUrl: './autocomplete-form.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteFormComponent),
      multi: true
    }
  ]
})
export class AutocompleteFormComponent {
  @Input({ required: true }) id: string = '';
  @Input({ required: true }) placeholder: string = '';
  @Input({ required: true }) options: any[] = [];

  @Output('onInput') onInputEmitter = new EventEmitter<string>();
  @Output('onBlur') onBlurEmitter = new EventEmitter<void>();
  @Output('onSelect') onSelectEmitter = new EventEmitter<{ id: string, value: string }>();

  onSelect(input: HTMLInputElement, id: string, value: string) {
    this.value = value;
    this.onChange(this.value);
    input.value = value;
    this.onSelectEmitter.emit({ id: id, value: value });
  }

  reset() {
    this.value = '';
    this.onInputEmitter.emit('');
  }

  toggleMenu: boolean = false;
  onClickToggleMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

  value: string = '';
  disabled: boolean = false;

  private onChange = (value: string) => { };
  private onTouched = () => { };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onInputEmitter.emit(this.value);
  }

  handleBlur(): void {
    this.onTouched();
    this.onBlurEmitter.emit();
  }
}
