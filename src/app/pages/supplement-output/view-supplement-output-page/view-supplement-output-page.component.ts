import { Component, inject } from '@angular/core';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { DatePipe } from '../../../pipes/date.pipe';
import { SupplementOutputsService } from '../../../services/supplement-outputs.service';
import { ROUTERS_ICONS_MAP } from '../../../utils/routers-icons-map';

@Component({
  selector: 'app-view-supplement-output-page',
  templateUrl: './view-supplement-output-page.component.html',
  styleUrl: './view-supplement-output-page.component.scss',
  providers: [DatePipe]
})
export class ViewSupplementOutputPageComponent {
  userLogged = {} as IEmployee;

  supplementOutputsList: { id: number; values: { key: string; value: string | null; }[] }[] = [];

  routersIconsMap = ROUTERS_ICONS_MAP;

  private readonly _supplementOutputssService = inject(SupplementOutputsService);

  constructor(private datePipe: DatePipe) { }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterSupplementOutputsList();
  }

  filterSupplementOutputsList(nameSupplement: string | undefined = undefined) {
    this._supplementOutputssService.getSupplementOutputs(nameSupplement).pipe().subscribe({
      next: (supplementOutputsList) => {
        const transformedSupplemnetOutputsList = supplementOutputsList?.map((supplementOutput) => ({
          id: supplementOutput.idSupplementOutput,
          values: [
            { key: 'Nome do Insumo', value: supplementOutput.nameSupplement },
            { key: 'Categoria do Insumo', value: supplementOutput.nameSupplementCategory },
            { key: 'Tipo de Medida', value: supplementOutput.typeMensure },
            { key: 'Data de Saída', value: this.datePipe.transform(supplementOutput.outputDate) },
          ]
        }))
        this.supplementOutputsList = transformedSupplemnetOutputsList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  search(value: string) {
    this.filterSupplementOutputsList(value);
  }
}
