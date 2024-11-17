import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class RegistrationSupplementCategoriesFormController {
  registrationSupplementCategoriesForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm()
  }

  createForm() {
    this.registrationSupplementCategoriesForm = this._fb.group({
      nameSupplementCategory: ['', Validators.required],
    })
  }
}
