import { Component, inject } from '@angular/core';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { SupplementsService } from '../../../services/supplements.service';
import { ROUTERS_ICONS_MAP } from '../../../utils/routers-icons-map';

@Component({
  selector: 'app-view-supplement-page',
  templateUrl: './view-supplement-page.component.html',
  styleUrl: './view-supplement-page.component.scss'
})
export class ViewSupplementPageComponent {
  userLogged = {} as IEmployee;

  supplementsList: { id: number; values: { key: string; value: string | null; }[] }[] = [];

  routersIconsMap = ROUTERS_ICONS_MAP;

  private readonly _supplementsService = inject(SupplementsService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterSupplementsList();
  }

  filterSupplementsList(nameSupplement: string | undefined = undefined) {
    this._supplementsService.getSupplements(nameSupplement).pipe().subscribe({
      next: (supplementsList) => {
        const transformedSupplemnetsList = supplementsList?.map((supplement) => ({
          id: supplement.idSupplement,
          values: [
            { key: 'Nome do Insumo', value: supplement.nameSupplement },
            { key: 'Quantidade em Estoque', value: supplement.stock.toString() },
            { key: 'Categoria do Insumo', value: supplement.nameSupplementCategory },
            { key: 'Tipo de Medida', value: supplement.typeMensure },
          ]
        }))
        this.supplementsList = transformedSupplemnetsList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  search(value: string) {
    this.filterSupplementsList(value);
  }
}
