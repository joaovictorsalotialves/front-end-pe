import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ISupplementCategory } from "../../../interfaces/supplement-category/supplement-category.interface";

export class DetailSupplementCategoriesFormController {
  detailSupplementCategoriesForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm()
  }

  fulfillDetailSupplementCategoryForm(supplementCategoryDetail: ISupplementCategory) {
    this.detailSupplementCategoriesForm.reset();

    this.detailSupplementCategoriesForm.patchValue({
      nameSupplementCategory: supplementCategoryDetail.nameSupplementCategory,
    })
  }

  createForm() {
    this.detailSupplementCategoriesForm = this._fb.group({
      nameSupplementCategory: ['', Validators.required],
    })
  }
}
