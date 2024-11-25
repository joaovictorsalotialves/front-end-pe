import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { AnimalsService } from '../../../services/animals.service';
import { ROUTERS_ICONS_MAP } from '../../../utils/routers-icons-map';

@Component({
  selector: 'app-view-animal-page',
  templateUrl: './view-animal-page.component.html',
  styleUrl: './view-animal-page.component.scss'
})
export class ViewAnimalPageComponent {
  userLogged = {} as IEmployee;

  animalsList: { id: number; values: { key: string; value: string | null; }[] }[] = [];

  routersIconsMap = ROUTERS_ICONS_MAP;

  private readonly _router = inject(Router);
  private readonly _animalsService = inject(AnimalsService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterAnimalsList();
  }

  filterAnimalsList(nameAnimal: string | undefined = undefined) {
    this._animalsService.getAnimals(nameAnimal).pipe().subscribe({
      next: (animalsList) => {
        const transformedAnimalsList = animalsList?.map((animal) => ({
          id: animal.idAnimal,
          values: [
            { key: 'Nome do animal', value: animal.nameAnimal },
            { key: 'Porte', value: animal.size },
            { key: 'Espécie', value: animal.nameSpecies },
            { key: 'Raça', value: animal.nameRace },
          ]
        }))
        this.animalsList = transformedAnimalsList || [];
      },
      error: (error) => {
        console.error(error.message);
        this._router.navigate(['/home']);
      }
    });
  }

  search(value: string) {
    this.filterAnimalsList(value);
  }
}
