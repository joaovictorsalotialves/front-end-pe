import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class RegistrationEmployeeFormController {
  registrationEmployeeForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private cellPhonePattern = /^(0[1-9]{2})[1-9][0-9]{7,8}$/;

  constructor() {
    this.createForm()
  }

  createForm() {
    this.registrationEmployeeForm = this._fb.group({
      nameEmployee: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      cellPhoneNumber: ['', [Validators.required, Validators.pattern(this.cellPhonePattern)]],
      publicPlace: ['', Validators.required],
      neighborhood: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      nameState: ['', Validators.required],
      idState: [null],
      nameCity: ['', Validators.required],
      idCity: [null],
      position: ['', Validators.required],
    });
  }
}
