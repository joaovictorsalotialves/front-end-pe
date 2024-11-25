import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { AdoptionsService } from '../../../services/adoptions.service';
import { ROUTERS_ICONS_MAP } from '../../../utils/routers-icons-map';

@Component({
  selector: 'app-view-adoption-page',
  templateUrl: './view-adoption-page.component.html',
  styleUrl: './view-adoption-page.component.scss'
})
export class ViewAdoptionPageComponent {
  userLogged = {} as IEmployee;

  adoptionsList: { id: number; values: { key: string; value: string | null; }[] }[] = [];

  routersIconsMap = ROUTERS_ICONS_MAP;

  private readonly _router = inject(Router);
  private readonly _adoptionsService = inject(AdoptionsService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterAdoptionsList();
  }

  filterAdoptionsList(nameAdoption: string | undefined = undefined) {
    this._adoptionsService.getAdoptions(nameAdoption).pipe().subscribe({
      next: (adoptionsList) => {
        const transformedAdoptionsList = adoptionsList?.map((adoption) => ({
          id: adoption.idAdoption,
          values: [
            { key: 'Nome do animal', value: adoption.nameAnimal },
            { key: 'Nome do adotante', value: adoption.nameUser },
            { key: 'Data da adoção', value: adoption.dateAdoption },
            { key: 'Status da adoção', value: adoption.statusAdoption },
          ]
        }))
        this.adoptionsList = transformedAdoptionsList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  search(value: string) {
    this.filterAdoptionsList(value);
  }
}
