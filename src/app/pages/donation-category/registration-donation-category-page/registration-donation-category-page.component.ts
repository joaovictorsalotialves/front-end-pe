import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { DonationCategoriesService } from '../../../services/donation-categories.service';
import { RegistrationDonationCategoriesFormController } from './registration-donation-categories-form-controller';

@Component({
  selector: 'app-registration-donation-category-page',
  templateUrl: './registration-donation-category-page.component.html',
  styleUrl: './registration-donation-category-page.component.scss'
})
export class RegistrationDonationCategoryPageComponent extends RegistrationDonationCategoriesFormController {
  userLogged = {} as IEmployee;
  submitted = false;

  private readonly _router = inject(Router);
  private readonly _donationCategoriesService = inject(DonationCategoriesService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
  }

  updateFormField(field: string, value: string) {
    this.registrationDonationCategoriesForm.patchValue({ [field]: value });
  }

  save() {
    this.submitted = true;
    if (this.registrationDonationCategoriesForm.invalid) {
      alert('Erro ao enviar formulário de cadastro de categoria de doação!');
      return;
    }
    this._donationCategoriesService.postDonationCategory({
      nameDonationCategory: this.registrationDonationCategoriesForm.value.nameDonationCategory,
    }).pipe().subscribe({
      next: (response) => {
        alert('Categoria de doação cadastrada com sucesso!');
        this._router.navigate(['/home'])
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
