import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DynamicValidationManager } from "../../../utils/dynamic-validation-manager";

export class RegistrationUserFormController {
  registrationUserForm!: FormGroup;
  validationManager!: DynamicValidationManager;

  private readonly _fb = inject(FormBuilder);

  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private cellPhonePattern = /^(0[1-9]{2})[1-9][0-9]{7,8}$/;

  constructor() {
    this.createForm();
    this.setupValidationManager();
  }

  get personal_information(): FormGroup {
    return this.registrationUserForm.get(['personal_information']) as FormGroup;
  }

  get address_information(): FormGroup {
    return this.registrationUserForm.get(['address_information']) as FormGroup;
  }

  createForm() {
    this.registrationUserForm = this._fb.group({
      personal_information: this._fb.group({
        nameUser: ['', Validators.required],
        email: ['', [Validators.pattern(this.emailPattern)]],
        cellPhoneNumber: ['', [Validators.required, Validators.pattern(this.cellPhonePattern)]],
      }),
      address_information: this._fb.group({
        publicPlace: [''],
        neighborhood: [''],
        number: [''],
        complement: [''],
        nameState: [''],
        idState: [null],
        nameCity: [''],
        idCity: [null],
      })
    });
  }

  setupValidationManager() {
    this.validationManager = new DynamicValidationManager(this.address_information);
    this.validationManager.setValidationConfig({
      publicPlace: [Validators.required],
      neighborhood: [Validators.required],
      number: [Validators.required],
      idState: [Validators.required],
      nameState: [Validators.required],
      idCity: [Validators.required],
      nameCity: [Validators.required],
    });
  }
}
