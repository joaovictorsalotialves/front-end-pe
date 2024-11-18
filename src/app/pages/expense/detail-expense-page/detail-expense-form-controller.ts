import { inject } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { IExpense } from "../../../interfaces/expenses/expense.interface";

export class DetailExpenseFormController {
  detailExpenseForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm()
  }

  createForm() {
    this.detailExpenseForm = this._fb.group({
      valueExpense: [null, [Validators.required, this.floatValidator()]],
      description: [''],
      paymentDate: [''],
      dueDate: ['', Validators.required],
      idExpenseCategory: [null, Validators.required],
      nameExpenseCategory: ['', Validators.required],
    })
  }

  fulfillDetailExpenseForm(expenseDetail: IExpense) {
    this.detailExpenseForm.reset();
    let formattedPaymentDate = null;
    if (expenseDetail.paymentDate) {
      formattedPaymentDate = new Date(expenseDetail.paymentDate as string).toISOString().split('T')[0];
    }
    let formattedDueDate = new Date(expenseDetail.dueDate as string).toISOString().split('T')[0];

    this.detailExpenseForm.patchValue({
      valueExpense: expenseDetail.valueExpense,
      description: expenseDetail.description,
      paymentDate: formattedPaymentDate,
      dueDate: formattedDueDate,
      idExpenseCategory: expenseDetail.idExpenseCategory,
      nameExpenseCategory: expenseDetail.nameExpenseCategory,
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
