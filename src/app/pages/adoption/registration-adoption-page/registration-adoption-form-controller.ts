import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class RegistrationAdoptionFormController {
  registrationAdoptionForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm();
  }

  createForm() {
    this.registrationAdoptionForm = this._fb.group({
      idAnimal: [null, Validators.required],
      nameAnimal: ['', Validators.required],
      idUser: [null, Validators.required],
      nameUser: ['', Validators.required],
      statusAdoption: ['', Validators.required],
    })
  }
}
