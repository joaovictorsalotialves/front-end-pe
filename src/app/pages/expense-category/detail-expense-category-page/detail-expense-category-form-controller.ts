import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IExpenseCategory } from "../../../interfaces/expense-category/expense-category.interface";

export class DetailExpenseCategoriesFormController {
  detailExpenseCategoriesForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm()
  }

  fulfillDetailExpenseCategoryForm(expenseCategoryDetail: IExpenseCategory) {
    this.detailExpenseCategoriesForm.reset();

    this.detailExpenseCategoriesForm.patchValue({
      nameExpenseCategory: expenseCategoryDetail.nameExpenseCategory,
    })
  }

  createForm() {
    this.detailExpenseCategoriesForm = this._fb.group({
      nameExpenseCategory: ['', Validators.required],
    })
  }
}
