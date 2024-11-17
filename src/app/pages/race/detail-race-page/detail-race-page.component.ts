import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { IRace } from '../../../interfaces/race/race.interface';
import { RacesService } from '../../../services/races.service';
import { DetailRacesFormController } from './detail-race-form-controller';

@Component({
  selector: 'app-detail-race-page',
  templateUrl: './detail-race-page.component.html',
  styleUrl: './detail-race-page.component.scss'
})
export class DetailRacePageComponent extends DetailRacesFormController {
  userLogged = {} as IEmployee;
  submitted = false;

  raceDetail = {} as IRace;
  raceId: string | null = null;

  private readonly _routerGet = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _racesService = inject(RacesService);

  ngOnInit() {
    this.raceId = this._routerGet.snapshot.paramMap.get('idRace');
  }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.getRacesDetail();
  }

  getRacesDetail() {
    if (this.raceId && !isNaN(Number(this.raceId))) {
      this._racesService.getRace(Number(this.raceId)).pipe().subscribe({
        next: (race) => {
          this.raceDetail = race as IRace;
          this.fulfillDetailRaceForm(this.raceDetail);
        },
        error: (error) => {
          alert(error);
        },
      });
    } else {
      alert('Não foi possivel visualizar essa raça!');
      this._router.navigate(['/races/view'])
    }
  }

  updateFormField(field: string, value: string) {
    this.detailRacesForm.patchValue({ [field]: value });
  }

  save() {
    this.submitted = true;
    if (this.detailRacesForm.invalid) {
      alert('Erro ao enviar formulário de edição de raça!');
      return;
    }
    this._racesService.putRace(this.raceDetail.idRace, {
      nameRace: this.detailRacesForm.value.nameRace,
    }).pipe().subscribe({
      next: (response) => {
        alert('Raça atualizada com sucesso!');
        this._router.navigate(['/races/view'])
      },
      error: (error) => {
        alert(error);
      }
    })
  }

  del() {
    this._racesService.deleteRace(Number(this.raceId)).pipe().subscribe({
      next: (response) => {
        alert('Raça deletada com sucesso!');
        this._router.navigate(['/races/view']);
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
