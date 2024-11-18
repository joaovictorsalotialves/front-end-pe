import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export class DynamicValidationManager {
  private validationConfig: { [key: string]: ValidatorFn[] } = {};
  private isUpdating = false;

  constructor(private formGroup: FormGroup) { }

  setValidationConfig(validationConfig: { [key: string]: ValidatorFn[] }): void {
    this.validationConfig = validationConfig;
    this.manageValidations();
  }

  private manageValidations(): void {
    this.formGroup.valueChanges.subscribe(() => {
      if (this.isUpdating) return;

      this.isUpdating = true;

      try {
        const hasAnyValue = Object.values(this.formGroup.value).some(
          (value) => !!value && value.toString().trim() !== ''
        );

        if (hasAnyValue) {
          this.setValidatorsForAllFields();
        } else {
          this.clearValidatorsForAllFields();
        }
      } finally {
        this.isUpdating = false;
      }
    });
  }

  private setValidatorsForAllFields(): void {
    Object.keys(this.formGroup.controls).forEach((key) => {
      const control = this.getControl(key);
      if (control) {
        control.setValidators(this.validationConfig[key] || []);
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  private clearValidatorsForAllFields(): void {
    Object.keys(this.formGroup.controls).forEach((key) => {
      const control = this.getControl(key);
      if (control) {
        control.clearValidators();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  private getControl(key: string): AbstractControl | null {
    return this.formGroup.get(key);
  }
}
