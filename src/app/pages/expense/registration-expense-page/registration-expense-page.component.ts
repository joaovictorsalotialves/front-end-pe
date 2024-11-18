import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { ExpenseCategoriesService } from '../../../services/expense-categories.service';
import { ExpensesService } from '../../../services/expenses.service';
import { STATUS_EXPENSE_MAP } from '../../../utils/status-expense-map';
import { RegistrationExpenseFormController } from './registration-expense-form-controller';

@Component({
  selector: 'app-registration-expense-page',
  templateUrl: './registration-expense-page.component.html',
  styleUrl: './registration-expense-page.component.scss'
})
export class RegistrationExpensePageComponent extends RegistrationExpenseFormController {
  userLogged = {} as IEmployee;
  submitted = false;

  expenseCategoriesList: { id: number; value: string; }[] = []
  statusExpenseList = STATUS_EXPENSE_MAP;

  private readonly _router = inject(Router);
  private readonly _expensesService = inject(ExpensesService);
  private readonly _expenseCategoriesService = inject(ExpenseCategoriesService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterExpenseCategoriesList();
  }

  updateFormField(field: string, value: string) {
    this.registrationExpenseForm.patchValue({ [field]: value });
  }

  filterExpenseCategoriesList(nameExpenseCategory: string | undefined = undefined) {
    this._expenseCategoriesService.getExpenseCategories(nameExpenseCategory).pipe().subscribe({
      next: (expenseCategoriesList) => {
        const transformedExpenseCategoriesList = expenseCategoriesList?.map((expenseCategory) => ({
          id: expenseCategory.idExpenseCategory,
          value: expenseCategory.nameExpenseCategory,
        }))
        this.expenseCategoriesList = transformedExpenseCategoriesList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  onSelectExpenseCategory(event: { id: string, value: string }) {
    this.registrationExpenseForm.patchValue({ 'nameExpenseCategory': event.value });
    this.registrationExpenseForm.patchValue({ 'idExpenseCategory': event.id });
  }

  onSelectStatusExpense(event: { id: string, value: string }) {
    this.registrationExpenseForm.patchValue({ 'statusExpense': event.value });
  }

  save() {
    this.submitted = true;
    if (this.registrationExpenseForm.invalid) {
      alert('Erro ao enviar formulário de cadastro de despesa!');
      return;
    }
    this._expensesService.postExpense({
      valueExpense: this.registrationExpenseForm.value.valueExpense,
      description: this.registrationExpenseForm.value.description,
      paymentDate: this.registrationExpenseForm.value.paymentDate ? this.registrationExpenseForm.value.paymentDate : null,
      dueDate: this.registrationExpenseForm.value.dueDate,
      idExpenseCategory: this.registrationExpenseForm.value.idExpenseCategory,
    }).pipe().subscribe({
      next: (response) => {
        alert('Despesa cadastrada com sucesso!');
        this._router.navigate(['/home'])
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
