import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class RegistrationSpeciesFormController {
  registrationSpeciesForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm()
  }

  createForm() {
    this.registrationSpeciesForm = this._fb.group({
      nameSpecies: ['', Validators.required],
    })
  }
}
