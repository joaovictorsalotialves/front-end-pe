import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DynamicValidationManager } from "../../../utils/dynamic-validation-manager";

export class RegistrationEmployeeFormController {
  registrationEmployeeForm!: FormGroup;
  validationManager!: DynamicValidationManager;

  private readonly _fb = inject(FormBuilder);

  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private cellPhonePattern = /^(0[1-9]{2})[1-9][0-9]{7,8}$/;

  constructor() {
    this.createForm();
    this.setupValidationManager();
  }

  get personal_information(): FormGroup {
    return this.registrationEmployeeForm.get(['personal_information']) as FormGroup;
  }

  get address_information(): FormGroup {
    return this.registrationEmployeeForm.get(['address_information']) as FormGroup;
  }

  createForm() {
    this.registrationEmployeeForm = this._fb.group({
      personal_information: this._fb.group({
        nameEmployee: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        cellPhoneNumber: ['', [Validators.required, Validators.pattern(this.cellPhonePattern)]],
        position: ['', Validators.required],
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
      nameState: [Validators.required],
      nameCity: [Validators.required],
    });
  }
}
