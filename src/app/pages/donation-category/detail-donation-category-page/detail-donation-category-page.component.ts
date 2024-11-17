import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDonationCategory } from '../../../interfaces/donation-category/donation-category.interface';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { DonationCategoriesService } from '../../../services/donation-categories.service';
import { DetailDonationCategoriesFormController } from './detail-donation-category-form-controller';

@Component({
  selector: 'app-detail-donation-category-page',
  templateUrl: './detail-donation-category-page.component.html',
  styleUrl: './detail-donation-category-page.component.scss'
})
export class DetailDonationCategoryPageComponent extends DetailDonationCategoriesFormController {
  userLogged = {} as IEmployee;
  submitted = false;

  donationCategoryDetail = {} as IDonationCategory;
  donationCategoryId: string | null = null;

  private readonly _routerGet = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _donationCategoriesService = inject(DonationCategoriesService);

  ngOnInit() {
    this.donationCategoryId = this._routerGet.snapshot.paramMap.get('idDonationCategory');
  }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.getDonationCategoryDetail();
  }

  getDonationCategoryDetail() {
    if (this.donationCategoryId && !isNaN(Number(this.donationCategoryId))) {
      this._donationCategoriesService.getDonationCategory(Number(this.donationCategoryId)).pipe().subscribe({
        next: (donationCategory) => {
          this.donationCategoryDetail = donationCategory as IDonationCategory;
          this.fulfillDetailDonationCategoryForm(this.donationCategoryDetail);
        },
        error: (error) => {
          alert(error);
        },
      });
    } else {
      alert('Não foi possivel visualizar essa categoria de doação!');
      this._router.navigate(['/donation-categories/view'])
    }
  }

  updateFormField(field: string, value: string) {
    this.detailDonationCategoriesForm.patchValue({ [field]: value });
  }

  save() {
    this.submitted = true;
    if (this.detailDonationCategoriesForm.invalid) {
      alert('Erro ao enviar formulário de edição de categoria de doação!');
      return;
    }
    this._donationCategoriesService.putDonationCategory(this.donationCategoryDetail.idDonationCategory, {
      nameDonationCategory: this.detailDonationCategoriesForm.value.nameDonationCategory,
    }).pipe().subscribe({
      next: (response) => {
        alert('Categoria de doação atualizada com sucesso!');
        this._router.navigate(['/donation-categories/view'])
      },
      error: (error) => {
        alert(error);
      }
    })
  }

  del() {
    this._donationCategoriesService.deleteDonationCategory(Number(this.donationCategoryId)).pipe().subscribe({
      next: (response) => {
        alert('Categoria de doação deletada com sucesso!');
        this._router.navigate(['/donation-categories/view']);
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
