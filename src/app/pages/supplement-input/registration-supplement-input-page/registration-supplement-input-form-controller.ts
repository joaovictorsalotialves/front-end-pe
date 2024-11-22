import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class RegistrationSupplementInputFormController {
  registrationSupplementInputForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm();
  }

  createForm() {
    this.registrationSupplementInputForm = this._fb.group({
      description: [''],
      amount: ['', Validators.required],
      idSupplement: ['', Validators.required],
      nameSupplement: ['', Validators.required],
    });
  }
}
