import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class RegistrationAnimalFormController {
  registrationAnimalForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm();
  }

  createForm() {
    this.registrationAnimalForm = this._fb.group({
      nameAnimal: ['', Validators.required],
      size: ['', Validators.required],
      statusAnimal: ['', Validators.required],
      description: [''],
      idSpecies: [null, Validators.required],
      nameSpecies: ['', Validators.required],
      idRace: [null, Validators.required],
      nameRace: ['', Validators.required],
    })
  }
}
