import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { ISupplement } from '../../../interfaces/supplements/supplement.interface';
import { SupplementCategoriesService } from '../../../services/supplement-categories.service';
import { SupplementsService } from '../../../services/supplements.service';
import { TYPE_MENSURE_MAP } from '../../../utils/type-mensure-map';
import { DetailSupplementFormController } from './detail-supplement-form-controller';

@Component({
  selector: 'app-detail-supplement-page',
  templateUrl: './detail-supplement-page.component.html',
  styleUrl: './detail-supplement-page.component.scss'
})
export class DetailSupplementPageComponent extends DetailSupplementFormController implements OnInit {
  userLogged = {} as IEmployee;
  submitted = false;

  supplementCategoriesList: { id: number; value: string; }[] = [];
  tipeMensureMap: { id: number; value: string; }[] = TYPE_MENSURE_MAP;

  supplementDetail = {} as ISupplement;
  supplementId: string | null = null;

  private readonly _routerGet = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _supplementCategoriesServices = inject(SupplementCategoriesService);
  private readonly _supplementsServices = inject(SupplementsService);

  ngOnInit() {
    this.supplementId = this._routerGet.snapshot.paramMap.get('idSupplement');
  }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.getSupplementDetail();
  }

  getSupplementDetail() {
    if (this.supplementId && !isNaN(Number(this.supplementId))) {
      this._supplementsServices.getSupplement(Number(this.supplementId)).pipe().subscribe({
        next: (supplement) => {
          this.supplementDetail = supplement as ISupplement;
          this.fulfillDetailSupplementForm(this.supplementDetail);
          this.filterSupplementCategoriesList(this.supplementDetail.nameSupplementCategory);
        },
        error: (error) => {
          alert(error);
          this._router.navigate(['/supplements/view']);
        },
      });
    } else {
      alert('Não foi possivel visualizar esse insumo!');
      this._router.navigate(['/supplements/view']);
    }
  }

  updateFormField(field: string, value: string) {
    this.detailSupplementForm.patchValue({ [field]: value });
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
    this.detailSupplementForm.patchValue({ 'nameSupplementCategory': event.value });
    this.detailSupplementForm.patchValue({ 'idSupplementCategory': event.id });
  }

  onSelectTypeMensure(event: { id: string, value: string }) {
    this.detailSupplementForm.patchValue({ 'typeMensure': event.value });
  }

  save() {
    this.submitted = true;
    if (this.detailSupplementForm.invalid) {
      alert('Erro ao enviar formulário de cadastro de insumo!');
      return;
    }

    this._supplementsServices.putSupplement(this.supplementDetail.idSupplement, {
      nameSupplement: this.detailSupplementForm.value.nameSupplement,
      stock: this.detailSupplementForm.value.stock,
      typeMensure: this.detailSupplementForm.value.typeMensure,
      idSupplementCategory: this.detailSupplementForm.value.idSupplementCategory,
    }).pipe().subscribe({
      next: (response) => {
        alert('Insumo atualizado com sucesso!');
        this._router.navigate(['/supplements/view']);
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
