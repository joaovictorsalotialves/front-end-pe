import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { ISupplementCategory } from '../../../interfaces/supplement-category/supplement-category.interface';
import { SupplementCategoriesService } from '../../../services/supplement-categories.service';
import { DetailSupplementCategoriesFormController } from './detail-supplement-category-form-controller';

@Component({
  selector: 'app-detail-supplement-category-page',
  templateUrl: './detail-supplement-category-page.component.html',
  styleUrl: './detail-supplement-category-page.component.scss'
})
export class DetailSupplementCategoryPageComponent extends DetailSupplementCategoriesFormController {
  userLogged = {} as IEmployee;
  submitted = false;

  supplementCategoryDetail = {} as ISupplementCategory;
  supplementCategoryId: string | null = null;

  private readonly _routerGet = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _supplementCategoriesService = inject(SupplementCategoriesService);

  ngOnInit() {
    this.supplementCategoryId = this._routerGet.snapshot.paramMap.get('idSupplementCategory');
  }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.getSupplementCategoryDetail();
  }

  getSupplementCategoryDetail() {
    if (this.supplementCategoryId && !isNaN(Number(this.supplementCategoryId))) {
      this._supplementCategoriesService.getSupplementCategory(Number(this.supplementCategoryId)).pipe().subscribe({
        next: (supplementCategory) => {
          this.supplementCategoryDetail = supplementCategory as ISupplementCategory;
          this.fulfillDetailSupplementCategoryForm(this.supplementCategoryDetail);
        },
        error: (error) => {
          alert(error);
          this._router.navigate(['/supplement-categories/view']);
        },
      });
    } else {
      alert('Não foi possivel visualizar essa categoria de insumo!');
      this._router.navigate(['/supplement-categories/view']);
    }
  }

  updateFormField(field: string, value: string) {
    this.detailSupplementCategoriesForm.patchValue({ [field]: value });
  }

  save() {
    this.submitted = true;
    if (this.detailSupplementCategoriesForm.invalid) {
      alert('Erro ao enviar formulário de edição de categoria de insumo!');
      return;
    }
    this._supplementCategoriesService.putSupplementCategory(this.supplementCategoryDetail.idSupplementCategory, {
      nameSupplementCategory: this.detailSupplementCategoriesForm.value.nameSupplementCategory,
    }).pipe().subscribe({
      next: (response) => {
        alert('Categoria de insumo atualizada com sucesso!');
        this._router.navigate(['/supplement-categories/view'])
      },
      error: (error) => {
        alert(error);
      }
    })
  }

  del() {
    this._supplementCategoriesService.deleteSupplementCategory(Number(this.supplementCategoryId)).pipe().subscribe({
      next: (response) => {
        alert('Categoria de insumo deletada com sucesso!');
        this._router.navigate(['/supplement-categories/view']);
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
