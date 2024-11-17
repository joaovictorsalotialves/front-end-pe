import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class RegistrationDonationCategoriesFormController {
  registrationDonationCategoriesForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm()
  }

  createForm() {
    this.registrationDonationCategoriesForm = this._fb.group({
      nameDonationCategory: ['', Validators.required],
    })
  }
}
