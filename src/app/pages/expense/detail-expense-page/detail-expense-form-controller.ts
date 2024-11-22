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
      registrationDate: [''],
      paymentDate: [''],
      dueDate: ['', Validators.required],
      statusExpense: [''],
      idExpenseCategory: [null, Validators.required],
      nameExpenseCategory: ['', Validators.required],
    });
    this.detailExpenseForm.get('registrationDate')?.disable();
    this.detailExpenseForm.get('statusExpense')?.disable();
  }

  fulfillDetailExpenseForm(expenseDetail: IExpense) {
    this.detailExpenseForm.reset();
    let formattedPaymentDate = null;
    if (expenseDetail.paymentDate) {
      formattedPaymentDate = new Date(expenseDetail.paymentDate as string).toISOString().split('T')[0];
    }
    let formattedDueDate = new Date(expenseDetail.dueDate as string).toISOString().split('T')[0];
    let formattedRegistrationDate = new Date(expenseDetail.registrationDate as string).toISOString().split('T')[0];

    this.detailExpenseForm.patchValue({
      valueExpense: expenseDetail.valueExpense,
      description: expenseDetail.description,
      registrationDate: formattedRegistrationDate,
      paymentDate: formattedPaymentDate,
      dueDate: formattedDueDate,
      statusExpense: expenseDetail.statusExpense,
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
