import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { SupplementCategoriesService } from '../../../services/supplement-categories.service';
import { RegistrationSupplementCategoriesFormController } from './registration-supplement-category-form-controller';

@Component({
  selector: 'app-registration-supplement-category-page',
  templateUrl: './registration-supplement-category-page.component.html',
  styleUrl: './registration-supplement-category-page.component.scss'
})
export class RegistrationSupplementCategoryPageComponent extends RegistrationSupplementCategoriesFormController {
  userLogged = {} as IEmployee;
  submitted = false;

  private readonly _router = inject(Router);
  private readonly _supplementCategoriesService = inject(SupplementCategoriesService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
  }

  updateFormField(field: string, value: string) {
    this.registrationSupplementCategoriesForm.patchValue({ [field]: value });
  }

  save() {
    this.submitted = true;
    if (this.registrationSupplementCategoriesForm.invalid) {
      alert('Erro ao enviar formulário de cadastro de categoria de insumos!');
      return;
    }
    this._supplementCategoriesService.postSupplementCategory({
      nameSupplementCategory: this.registrationSupplementCategoriesForm.value.nameSupplementCategory,
    }).pipe().subscribe({
      next: (response) => {
        alert('Categoria de insumo cadastrada com sucesso!');
        this._router.navigate(['/home'])
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
