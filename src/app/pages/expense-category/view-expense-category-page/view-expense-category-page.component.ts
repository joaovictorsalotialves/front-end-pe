import { Component, inject } from '@angular/core';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { ExpenseCategoriesService } from '../../../services/expense-categories.service';
import { ROUTERS_ICONS_MAP } from '../../../utils/routers-icons-map';

@Component({
  selector: 'app-view-expense-category-page',
  templateUrl: './view-expense-category-page.component.html',
  styleUrl: './view-expense-category-page.component.scss'
})
export class ViewExpenseCategoryPageComponent {
  userLogged = {} as IEmployee;

  expenseCategoriesList: { id: number; values: { key: string; value: string | null; }[] }[] = [];

  routersIconsMap = ROUTERS_ICONS_MAP;

  private readonly _expenseCategoriesService = inject(ExpenseCategoriesService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterExpenseCategoryList();
  }

  filterExpenseCategoryList(nameExpenseCategory: string | undefined = undefined) {
    this._expenseCategoriesService.getExpenseCategories(nameExpenseCategory).pipe().subscribe({
      next: (expenseCategoriesList) => {
        const transformedExpenseCategoriesList = expenseCategoriesList?.map((expenseCategory) => ({
          id: expenseCategory.idExpenseCategory,
          values: [
            { key: 'Nome da Categoria', value: expenseCategory.nameExpenseCategory },
          ]
        }))
        this.expenseCategoriesList = transformedExpenseCategoriesList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  search(value: string) {
    this.filterExpenseCategoryList(value);
  }
}
