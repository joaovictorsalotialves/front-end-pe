import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IDonationCategory } from "../../../interfaces/donation-category/donation-category.interface";

export class DetailDonationCategoriesFormController {
  detailDonationCategoriesForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm()
  }

  fulfillDetailDonationCategoryForm(donationCategoryDetail: IDonationCategory) {
    this.detailDonationCategoriesForm.reset();

    this.detailDonationCategoriesForm.patchValue({
      nameDonationCategory: donationCategoryDetail.nameDonationCategory,
    })
  }

  createForm() {
    this.detailDonationCategoriesForm = this._fb.group({
      nameDonationCategory: ['', Validators.required],
    })
  }
}
