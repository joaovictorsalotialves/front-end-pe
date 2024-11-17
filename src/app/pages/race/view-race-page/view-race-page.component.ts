import { Component, inject } from '@angular/core';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { RacesService } from '../../../services/races.service';
import { ROUTERS_ICONS_MAP } from '../../../utils/routers-icons-map';

@Component({
  selector: 'app-view-race-page',
  templateUrl: './view-race-page.component.html',
  styleUrl: './view-race-page.component.scss'
})
export class ViewRacePageComponent {
  userLogged = {} as IEmployee;

  racesList: { id: number; values: { key: string; value: string | null; }[] }[] = [];

  routersIconsMap = ROUTERS_ICONS_MAP;

  private readonly _racesService = inject(RacesService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterRacesList();
  }

  filterRacesList(nameRaces: string | undefined = undefined) {
    this._racesService.getRaces(nameRaces).pipe().subscribe({
      next: (racesList) => {
        const transformedRacesList = racesList?.map((race) => ({
          id: race.idRace,
          values: [
            { key: 'Nome da Categoria', value: race.nameRace },
          ]
        }))
        this.racesList = transformedRacesList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  search(value: string) {
    this.filterRacesList(value);
  }
}
