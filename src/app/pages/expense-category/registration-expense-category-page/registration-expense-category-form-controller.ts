import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class RegistrationExpenseCategoriesFormController {
  registrationExpenseCategoriesForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm()
  }

  createForm() {
    this.registrationExpenseCategoriesForm = this._fb.group({
      nameExpenseCategory: ['', Validators.required],
    })
  }
}
