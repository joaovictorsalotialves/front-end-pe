import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { CurrencyBRPipe } from '../../../pipes/currency-br.pipe';
import { DatePipe } from '../../../pipes/date.pipe';
import { ExpensesService } from '../../../services/expenses.service';
import { ROUTERS_ICONS_MAP } from '../../../utils/routers-icons-map';

@Component({
  selector: 'app-view-expense-page',
  templateUrl: './view-expense-page.component.html',
  styleUrl: './view-expense-page.component.scss',
  providers: [DatePipe, CurrencyBRPipe]
})
export class ViewExpensePageComponent {
  userLogged = {} as IEmployee;

  expensesList: { id: number; values: { key: string; value: string | null; }[] }[] = [];

  routersIconsMap = ROUTERS_ICONS_MAP;

  private readonly _router = inject(Router);
  private readonly _expensesService = inject(ExpensesService);

  constructor(
    private datePipe: DatePipe,
    private currencyBRPipe: CurrencyBRPipe
  ) { }

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
            { key: 'Valor da Despesa', value: this.currencyBRPipe.transform(expense.valueExpense.toString()) },
            { key: 'Categoria da Despesa', value: expense.nameExpenseCategory },
            { key: 'Data de Vencimento', value: this.datePipe.transform(expense.dueDate) },
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
