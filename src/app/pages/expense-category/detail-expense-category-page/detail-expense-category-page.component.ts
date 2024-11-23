import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { IExpenseCategory } from '../../../interfaces/expense-category/expense-category.interface';
import { ExpenseCategoriesService } from '../../../services/expense-categories.service';
import { DetailExpenseCategoriesFormController } from './detail-expense-category-form-controller';

@Component({
  selector: 'app-detail-expense-category-page',
  templateUrl: './detail-expense-category-page.component.html',
  styleUrl: './detail-expense-category-page.component.scss'
})
export class DetailExpenseCategoryPageComponent extends DetailExpenseCategoriesFormController {
  userLogged = {} as IEmployee;
  submitted = false;

  expenseCategoryDetail = {} as IExpenseCategory;
  expenseCategoryId: string | null = null;

  private readonly _routerGet = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _expenseCategoriesService = inject(ExpenseCategoriesService);

  ngOnInit() {
    this.expenseCategoryId = this._routerGet.snapshot.paramMap.get('idExpenseCategory');
  }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.getExpenseCategoryDetail();
  }

  getExpenseCategoryDetail() {
    if (this.expenseCategoryId && !isNaN(Number(this.expenseCategoryId))) {
      this._expenseCategoriesService.getExpenseCategory(Number(this.expenseCategoryId)).pipe().subscribe({
        next: (expenseCategory) => {
          this.expenseCategoryDetail = expenseCategory as IExpenseCategory;
          this.fulfillDetailExpenseCategoryForm(this.expenseCategoryDetail);
        },
        error: (error) => {
          alert(error);
          this._router.navigate(['/donation-categories/view']);
        },
      });
    } else {
      alert('Não foi possivel visualizar essa categoria de despesa');
      this._router.navigate(['/donation-categories/view']);
    }
  }

  updateFormField(field: string, value: string) {
    this.detailExpenseCategoriesForm.patchValue({ [field]: value });
  }

  save() {
    this.submitted = true;
    if (this.detailExpenseCategoriesForm.invalid) {
      alert('Erro ao enviar formulário de edição de categoria de despesa!');
      return;
    }
    this._expenseCategoriesService.putExpenseCategory(this.expenseCategoryDetail.idExpenseCategory, {
      nameExpenseCategory: this.detailExpenseCategoriesForm.value.nameExpenseCategory,
    }).pipe().subscribe({
      next: (response) => {
        alert('Categoria de despesa atualizada com sucesso!');
        this._router.navigate(['/expense-categories/view']);
      },
      error: (error) => {
        alert(error);
      }
    })
  }

  del() {
    this._expenseCategoriesService.deleteExpenseCategory(Number(this.expenseCategoryId)).pipe().subscribe({
      next: (response) => {
        alert('Categoria de despesa deletada com sucesso!');
        this._router.navigate(['/expense-categories/view']);
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
