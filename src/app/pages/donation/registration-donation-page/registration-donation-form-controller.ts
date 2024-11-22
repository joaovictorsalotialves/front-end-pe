import { inject } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { DynamicValidationManager } from "../../../utils/dynamic-validation-manager";

export class RegistrationDoantionFormController {
  registrationDonationForm!: FormGroup;
  validationManager!: DynamicValidationManager;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm();
    this.setupValidationManager();
  }

  get donation_information(): FormGroup {
    return this.registrationDonationForm.get(['donation_information']) as FormGroup;
  }

  get supplement_input_information(): FormGroup {
    return this.registrationDonationForm.get(['supplement_input_information']) as FormGroup;
  }

  createForm() {
    this.registrationDonationForm = this._fb.group({
      donation_information: this._fb.group({
        valueDonation: ['', this.floatValidator()],
        description: [''],
        idUser: [''],
        nameUser: [''],
        idDonationCategory: ['', Validators.required],
        nameDonationCategory: ['', Validators.required],
      }),
      supplement_input_information: this._fb.group({
        amount: [''],
        descriptionSupplementInput: [''],
        idSupplement: [''],
        nameSupplement: [''],
      }),
    });
  }

  setupValidationManager() {
    this.validationManager = new DynamicValidationManager(this.supplement_input_information);
    this.validationManager.setValidationConfig({
      amount: [Validators.required],
      idSupplement: [Validators.required],
    });
  }

  private floatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value = String(control.value)?.trim();
      let floatRegex = /^[+]?\d+(\.\d+)?$/;

      if (value === '' || value === null) {
        return null;
      }

      return floatRegex.test(value) ? null : { floatInvalid: true };
    };
  }
}
