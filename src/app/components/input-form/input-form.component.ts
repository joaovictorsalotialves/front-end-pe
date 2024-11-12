import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFormComponent),
      multi: true
    }
  ]
})
export class InputFormComponent implements ControlValueAccessor {
  @Input({ required: true }) type: string = '';
  @Input({ required: true }) id: string = '';
  @Input({ required: true }) placeholder: string = '';
  @Input() icon?: string;

  @Output('onInput') onInputEmiter = new EventEmitter<string>();
  @Output() onBlur = new EventEmitter<void>();

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
    this.onInputEmiter.emit(this.value);
  }

  handleBlur(): void {
    this.onTouched();
    this.onBlur.emit();
  }
}
