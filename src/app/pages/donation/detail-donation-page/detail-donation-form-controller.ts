import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IDonation } from "../../../interfaces/donations/donation.interface";
import { DynamicValidationManager } from "../../../utils/dynamic-validation-manager";

export class DetailDonationFormController {
  detailDonationForm!: FormGroup;
  validationManager!: DynamicValidationManager;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm();
    this.setupValidationManager();
  }

  get donation_information(): FormGroup {
    return this.detailDonationForm.get(['donation_information']) as FormGroup;
  }

  get supplement_input_information(): FormGroup {
    return this.detailDonationForm.get(['supplement_input_information']) as FormGroup;
  }

  fulfillDetailDonationForm(donationDetail: IDonation) {
    this.detailDonationForm.reset();
    let formattedDonationDate = new Date(donationDetail.donationDate as string).toISOString().split('T')[0];

    this.donation_information.patchValue({
      valueDonation: donationDetail.valueDonation,
      description: donationDetail.description,
      idUser: donationDetail.idUser,
      nameUser: donationDetail.nameUser,
      idDonationCategory: donationDetail.idDonationCategory,
      nameDonationCategory: donationDetail.nameDonationCategory,
      donationDate: formattedDonationDate,
    });

    this.supplement_input_information.patchValue({
      amount: donationDetail.amount,
      descriptionSupplementInput: donationDetail.descriptionSupplementInput,
      idSupplement: donationDetail.idSupplement,
      nameSupplement: donationDetail.nameSupplement,
    });
  }

  private createForm() {
    this.detailDonationForm = this._fb.group({
      donation_information: this._fb.group({
        valueDonation: [''],
        description: [''],
        idUser: [null],
        nameUser: [''],
        idDonationCategory: [null, Validators.required],
        nameDonationCategory: ['', Validators.required],
        donationDate: [''],
      }),
      supplement_input_information: this._fb.group({
        amount: [null],
        descriptionSupplementInput: [''],
        idSupplement: [null],
        nameSupplement: [''],
      }),
    });
    this.donation_information.get('donationDate')?.disable();
  }

  private setupValidationManager() {
    this.validationManager = new DynamicValidationManager(this.supplement_input_information);
    this.validationManager.setValidationConfig({
      amount: [Validators.required],
      nameSupplement: [Validators.required],
      idSupplement: [Validators.required],
    });
  }
}
