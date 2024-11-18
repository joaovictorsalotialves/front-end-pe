import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class RegistrationRacesFormController {
  registrationRacesForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm();
  }

  createForm() {
    this.registrationRacesForm = this._fb.group({
      nameRace: ['', Validators.required],
    })
  }
}
