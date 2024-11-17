import { Component, inject } from '@angular/core';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { DonationCategoriesService } from '../../../services/donation-categories.service';
import { ROUTERS_ICONS_MAP } from '../../../utils/routers-icons-map';

@Component({
  selector: 'app-view-donation-category-page',
  templateUrl: './view-donation-category-page.component.html',
  styleUrl: './view-donation-category-page.component.scss'
})
export class ViewDonationCategoryPageComponent {
  userLogged = {} as IEmployee;

  donationCategoriesList: { id: number; values: { key: string; value: string | null; }[] }[] = [];

  routersIconsMap = ROUTERS_ICONS_MAP;

  private readonly _donationCategoriesService = inject(DonationCategoriesService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterDonationCategoryList();
  }

  filterDonationCategoryList(nameDonationCategory: string | undefined = undefined) {
    this._donationCategoriesService.getDonationCategories(nameDonationCategory).pipe().subscribe({
      next: (donationCategoriesList) => {
        const transformedDonationCategoriesList = donationCategoriesList?.map((donationCategory) => ({
          id: donationCategory.idDonationCategory,
          values: [
            { key: 'Nome da Categoria', value: donationCategory.nameDonationCategory },
          ]
        }))
        this.donationCategoriesList = transformedDonationCategoriesList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  search(value: string) {
    this.filterDonationCategoryList(value);
  }
}
