import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class RegistrationSupplementFormController {
  registrationSupplementForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm();
  }

  createForm() {
    this.registrationSupplementForm = this._fb.group({
      nameSupplement: ['', Validators.required],
      stock: [0],
      typeMensure: ['', Validators.required],
      idSupplementCategory: ['', Validators.required],
      nameSupplementCategory: ['', Validators.required],
    })
  }
}
