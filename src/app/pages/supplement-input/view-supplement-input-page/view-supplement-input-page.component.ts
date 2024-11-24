import { Component, inject } from '@angular/core';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { SupplementInputsService } from '../../../services/supplement-inputs.service';
import { ROUTERS_ICONS_MAP } from '../../../utils/routers-icons-map';

@Component({
  selector: 'app-view-supplement-input-page',
  templateUrl: './view-supplement-input-page.component.html',
  styleUrl: './view-supplement-input-page.component.scss'
})
export class ViewSupplementInputPageComponent {
  userLogged = {} as IEmployee;

  supplementInputsList: { id: number; values: { key: string; value: string | null; }[] }[] = [];

  routersIconsMap = ROUTERS_ICONS_MAP;

  private readonly _supplementInputssService = inject(SupplementInputsService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterSupplementInputsList();
  }

  filterSupplementInputsList(nameSupplement: string | undefined = undefined) {
    this._supplementInputssService.getSupplementInputs(nameSupplement).pipe().subscribe({
      next: (supplementsList) => {
        const transformedSupplemnetsList = supplementsList?.map((supplementInput) => ({
          id: supplementInput.idSupplementInput,
          values: [
            { key: 'Nome do Insumo', value: supplementInput.nameSupplement },
            { key: 'Categoria do Insumo', value: supplementInput.nameSupplementCategory },
            { key: 'Tipo de Medida', value: supplementInput.typeMensure },
            { key: 'Data da Entrada', value: supplementInput.inputDate },
          ]
        }))
        this.supplementInputsList = transformedSupplemnetsList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  search(value: string) {
    this.filterSupplementInputsList(value);
  }
}
