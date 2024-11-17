import { Component, inject } from '@angular/core';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { SpeciesService } from '../../../services/especies.service';
import { ROUTERS_ICONS_MAP } from '../../../utils/routers-icons-map';

@Component({
  selector: 'app-view-species-page',
  templateUrl: './view-species-page.component.html',
  styleUrl: './view-species-page.component.scss'
})
export class ViewSpeciesPageComponent {
  userLogged = {} as IEmployee;

  speciesList: { id: number; values: { key: string; value: string | null; }[] }[] = [];

  routersIconsMap = ROUTERS_ICONS_MAP;

  private readonly _speciesService = inject(SpeciesService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterSpeciesList();
  }

  filterSpeciesList(nameSpecies: string | undefined = undefined) {
    this._speciesService.getSpecies(nameSpecies).pipe().subscribe({
      next: (speciesList) => {
        const transformedSpeciesList = speciesList?.map((species) => ({
          id: species.idSpecies,
          values: [
            { key: 'Nome da Categoria', value: species.nameSpecies },
          ]
        }))
        this.speciesList = transformedSpeciesList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  search(value: string) {
    this.filterSpeciesList(value);
  }
}
