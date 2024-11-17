import { Component, inject } from '@angular/core';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { SupplementCategoriesService } from '../../../services/supplement-categories.service';
import { ROUTERS_ICONS_MAP } from '../../../utils/routers-icons-map';

@Component({
  selector: 'app-view-supplement-category-page',
  templateUrl: './view-supplement-category-page.component.html',
  styleUrl: './view-supplement-category-page.component.scss'
})
export class ViewSupplementCategoryPageComponent {
  userLogged = {} as IEmployee;

  supplementCategoriesList: { id: number; values: { key: string; value: string | null; }[] }[] = [];

  routersIconsMap = ROUTERS_ICONS_MAP;

  private readonly _supplementCategoriesService = inject(SupplementCategoriesService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterSupplementCategoryList();
  }

  filterSupplementCategoryList(nameSupplementCategory: string | undefined = undefined) {
    this._supplementCategoriesService.getSupplementCategories(nameSupplementCategory).pipe().subscribe({
      next: (supplementCategoriesList) => {
        const transformedSupplemnetCategoriesList = supplementCategoriesList?.map((supplementCategory) => ({
          id: supplementCategory.idSupplementCategory,
          values: [
            { key: 'Nome da Categoria', value: supplementCategory.nameSupplementCategory },
          ]
        }))
        this.supplementCategoriesList = transformedSupplemnetCategoriesList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  search(value: string) {
    this.filterSupplementCategoryList(value);
  }
}
