import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { IExpense } from '../../../interfaces/expenses/expense.interface';
import { ExpenseCategoriesService } from '../../../services/expense-categories.service';
import { ExpensesService } from '../../../services/expenses.service';
import { STATUS_EXPENSE_MAP } from '../../../utils/status-expense-map';
import { DetailExpenseFormController } from './detail-expense-form-controller';

@Component({
  selector: 'app-detail-expense-page',
  templateUrl: './detail-expense-page.component.html',
  styleUrl: './detail-expense-page.component.scss'
})
export class DetailExpensePageComponent extends DetailExpenseFormController implements OnInit {
  userLogged = {} as IEmployee;
  submitted = false;

  expenseCategoriesList: { id: number; value: string; }[] = []
  statusExpenseList = STATUS_EXPENSE_MAP;

  expenseDetail = {} as IExpense;
  expenseId: string | null = null;

  private readonly _router = inject(Router);
  private readonly _routerGet = inject(ActivatedRoute);
  private readonly _expensesService = inject(ExpensesService);
  private readonly _expenseCategoriesService = inject(ExpenseCategoriesService);

  ngOnInit() {
    this.expenseId = this._routerGet.snapshot.paramMap.get('idExpense');
  }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    if (this.userLogged.position != 'Administrador') {
      alert('Usuario não possui permissão para acessar esse recurso!');
      this._router.navigate(['/home']);
    }
    this.getExpenseDetail();
  }

  getExpenseDetail() {
    if (this.expenseId && !isNaN(Number(this.expenseId))) {
      this._expensesService.getExpense(Number(this.expenseId)).pipe().subscribe({
        next: (expense) => {
          this.expenseDetail = expense as IExpense;
          this.fulfillDetailExpenseForm(this.expenseDetail);
          this.filterExpenseCategoriesList(this.expenseDetail.nameExpenseCategory);
        },
        error: (error) => {
          alert(error);
        },
      });
    } else {
      alert('Não foi possivel visualizar essa despesa');
      this._router.navigate(['/expense/view'])
    }
  }

  updateFormField(field: string, value: string) {
    this.detailExpenseForm.patchValue({ [field]: value });
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
    this.detailExpenseForm.patchValue({ 'nameExpenseCategory': event.value });
    this.detailExpenseForm.patchValue({ 'idExpenseCategory': event.id });
  }

  onSelectStatusExpense(event: { id: string, value: string }) {
    this.detailExpenseForm.patchValue({ 'statusExpense': event.value });
  }

  save() {
    this.submitted = true;
    if (this.detailExpenseForm.invalid) {
      alert('Erro ao enviar formulário de edição de despesa!');
      return;
    }

    this._expensesService.putExpense(this.expenseDetail.idExpense, {
      valueExpense: this.detailExpenseForm.value.valueExpense,
      description: this.detailExpenseForm.value.description,
      paymentDate: this.detailExpenseForm.value.paymentDate ? this.detailExpenseForm.value.paymentDate : null,
      dueDate: this.detailExpenseForm.value.dueDate,
      idExpenseCategory: this.detailExpenseForm.value.idExpenseCategory,
    }).pipe().subscribe({
      next: (response) => {
        alert('Despesa atualizado com sucesso!');
        this._router.navigate(['/expenses/view']);
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  del() {
    this._expensesService.deleteExpense(Number(this.expenseId)).pipe().subscribe({
      next: (response) => {
        alert('Despesa deletada com sucesso!');
        this._router.navigate(['/expenses/view']);
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
