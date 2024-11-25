import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { AnimalsService } from '../../../services/animals.service';
import { ROUTERS_ICONS_MAP } from '../../../utils/routers-icons-map';

@Component({
  selector: 'app-view-clinical-report-page',
  templateUrl: './view-clinical-report-page.component.html',
  styleUrl: './view-clinical-report-page.component.scss'
})
export class ViewClinicalReportPageComponent implements OnInit {
  userLogged = {} as IEmployee;

  clinicalReportsList: { id: number; values: { key: string; value: string | null; }[] }[] = [];

  routersIconsMap = ROUTERS_ICONS_MAP;

  animalId: string | null = null;

  urlDetail: string = '';

  private readonly _routerGet = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _animalsService = inject(AnimalsService);

  ngOnInit() {
    this.animalId = this._routerGet.snapshot.paramMap.get('idAnimal');
    this.urlDetail = `/animals/${this.animalId}/clinical-reports`;
  }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterClinicalReportForAnimalList();
  }

  filterClinicalReportForAnimalList() {
    if (this.animalId && !isNaN(Number(this.animalId))) {
      this._animalsService.getAnimalClinicalReports(Number(this.animalId)).pipe().subscribe({
        next: (animalsList) => {
          const transformedAnimalsList = animalsList?.map((animal) => ({
            id: animal.idClinicalReport,
            values: [
              { key: 'Nome do animal', value: animal.nameAnimal },
              { key: 'Raça', value: animal.nameRace },
              { key: 'Nome do Veterinario', value: animal.nameEmployee },
              { key: 'Data do Relatorio', value: animal.registrationDate },
            ]
          }))
          this.clinicalReportsList = transformedAnimalsList || [];
        },
        error: (error) => {
          console.error(error.message);
          this._router.navigate(['/home']);
        }
      });
    } else {
      alert('Não foi possivel visualizar os relatorios clinicos desse animal!');
      this._router.navigate([`/animals/detail/${this.animalId}`]);
    }
  }
}
