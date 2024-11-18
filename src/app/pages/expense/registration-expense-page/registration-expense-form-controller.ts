import { inject } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export class RegistrationExpenseFormController {
  registrationExpenseForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm()
  }

  createForm() {
    this.registrationExpenseForm = this._fb.group({
      valueExpense: [null, [Validators.required, this.floatValidator()]],
      description: [''],
      paymentDate: [''],
      dueDate: ['', Validators.required],
      idExpenseCategory: [null, Validators.required],
      nameExpenseCategory: ['', Validators.required],
    })
  }

  private floatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value = control.value?.trim();
      let floatRegex = /^[+]?\d+(\.\d+)?$/;

      if (value === '' || value === null) {
        return null;
      }

      return floatRegex.test(value) ? null : { floatInvalid: true };
    };
  }

}
