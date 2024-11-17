import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { ExpenseCategoriesService } from '../../../services/expense-categories.service';
import { RegistrationExpenseCategoriesFormController } from './registration-expense-category-form-controller';

@Component({
  selector: 'app-registration-expense-category-page',
  templateUrl: './registration-expense-category-page.component.html',
  styleUrl: './registration-expense-category-page.component.scss'
})
export class RegistrationExpenseCategoryPageComponent extends RegistrationExpenseCategoriesFormController {
  userLogged = {} as IEmployee;
  submitted = false;

  private readonly _router = inject(Router);
  private readonly _expenseCategoriesService = inject(ExpenseCategoriesService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
  }

  updateFormField(field: string, value: string) {
    this.registrationExpenseCategoriesForm.patchValue({ [field]: value });
  }

  save() {
    this.submitted = true;
    if (this.registrationExpenseCategoriesForm.invalid) {
      alert('Erro ao enviar formulário de cadastro de categoria de despesa!');
      return;
    }
    this._expenseCategoriesService.postExpenseCategory({
      nameExpenseCategory: this.registrationExpenseCategoriesForm.value.nameExpenseCategory,
    }).pipe().subscribe({
      next: (response) => {
        alert('Categoria de despesa cadastrada com sucesso!');
        this._router.navigate(['/home'])
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
