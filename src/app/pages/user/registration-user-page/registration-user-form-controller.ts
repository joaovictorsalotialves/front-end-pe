import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class RegistrationUserFormController {
  registrationUserForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private cellPhonePattern = /^(0[1-9]{2})[1-9][0-9]{7,8}$/;

  constructor() {
    this.createForm()
  }

  createForm() {
    this.registrationUserForm = this._fb.group({
      nameUser: ['', Validators.required],
      email: ['', Validators.pattern(this.emailPattern)],
      cellPhoneNumber: ['', [Validators.required, Validators.pattern(this.cellPhonePattern)]],
      publicPlace: ['', Validators.required],
      neighborhood: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      nameState: ['', Validators.required],
      idState: [null],
      nameCity: ['', Validators.required],
      idCity: [null],
    });
  }
}
