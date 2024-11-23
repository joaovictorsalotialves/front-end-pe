import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { SupplementCategoriesService } from '../../../services/supplement-categories.service';
import { SupplementsService } from '../../../services/supplements.service';
import { TYPE_MENSURE_MAP } from '../../../utils/type-mensure-map';
import { RegistrationSupplementFormController } from './registration-supplement-form-controller';

@Component({
  selector: 'app-registration-supplement-page',
  templateUrl: './registration-supplement-page.component.html',
  styleUrl: './registration-supplement-page.component.scss'
})
export class RegistrationSupplementPageComponent extends RegistrationSupplementFormController {
  userLogged = {} as IEmployee;
  submitted = false;

  supplementCategoriesList: { id: number; value: string; }[] = [];
  tipeMensureMap: { id: number; value: string; }[] = TYPE_MENSURE_MAP;

  private readonly _router = inject(Router);
  private readonly _supplementCategoriesServices = inject(SupplementCategoriesService);
  private readonly _suppllementsServices = inject(SupplementsService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterSupplementCategoriesList();
  }

  updateFormField(field: string, value: string) {
    this.registrationSupplementForm.patchValue({ [field]: value });
  }

  filterSupplementCategoriesList(nameSupplementCategory: string | undefined = undefined) {
    this._supplementCategoriesServices.getSupplementCategories(nameSupplementCategory).pipe().subscribe({
      next: (supplementCategoriesList) => {
        const transformedSupplementCategoriesList = supplementCategoriesList?.map((supplementCategory) => ({
          id: supplementCategory.idSupplementCategory,
          value: supplementCategory.nameSupplementCategory,
        }))
        this.supplementCategoriesList = transformedSupplementCategoriesList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  onSelectSupplementCategory(event: { id: string, value: string }) {
    this.registrationSupplementForm.patchValue({ 'nameSupplementCategory': event.value });
    this.registrationSupplementForm.patchValue({ 'idSupplementCategory': event.id });
  }

  onSelectTypeMensure(event: { id: string, value: string }) {
    this.registrationSupplementForm.patchValue({ 'typeMensure': event.value });
  }

  save() {
    this.submitted = true;
    if (this.registrationSupplementForm.invalid) {
      alert('Erro ao enviar formulário de cadastro de insumo!');
      return;
    }

    this._suppllementsServices.postSupplement({
      nameSupplement: this.registrationSupplementForm.value.nameSupplement,
      stock: this.registrationSupplementForm.value.stock,
      typeMensure: this.registrationSupplementForm.value.typeMensure,
      idSupplementCategory: this.registrationSupplementForm.value.idSupplementCategory,
    }).pipe().subscribe({
      next: (response) => {
        alert('Insumo cadastrada com sucesso!');
        this._router.navigate(['/home'])
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
