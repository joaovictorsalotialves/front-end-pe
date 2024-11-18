import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { ExpensesService } from '../../../services/expenses.service';
import { ROUTERS_ICONS_MAP } from '../../../utils/routers-icons-map';

@Component({
  selector: 'app-view-expense-page',
  templateUrl: './view-expense-page.component.html',
  styleUrl: './view-expense-page.component.scss'
})
export class ViewExpensePageComponent {
  userLogged = {} as IEmployee;

  expensesList: { id: number; values: { key: string; value: string | null; }[] }[] = [];

  routersIconsMap = ROUTERS_ICONS_MAP;

  private readonly _router = inject(Router);
  private readonly _expensesService = inject(ExpensesService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterExpensesList();
  }

  filterExpensesList(nameExpense: string | undefined = undefined) {
    this._expensesService.getExpenses(nameExpense).pipe().subscribe({
      next: (expensesList) => {
        const transformedExpensesList = expensesList?.map((expense) => ({
          id: expense.idExpense,
          values: [
            { key: 'Valor da Despesa', value: expense.valueExpense.toString() },
            { key: 'Categoria da Despesa', value: expense.nameExpenseCategory },
            { key: 'Data de Vencimento', value: expense.dueDate },
            { key: 'Status da Despesa', value: expense.statusExpense },
          ]
        }))
        this.expensesList = transformedExpensesList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  search(value: string) {
    this.filterExpensesList(value);
  }
}
