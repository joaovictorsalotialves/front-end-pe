import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAnimal } from '../../../interfaces/animals/animal.interface';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { AnimalsService } from '../../../services/animals.service';
import { SpeciesService } from '../../../services/especies.service';
import { RacesService } from '../../../services/races.service';
import { SIZE_ANIMAL_MAP } from '../../../utils/size-animal-map';
import { STATUS_ANIMAL_MAP } from '../../../utils/status-animal-map';
import { DetailAnimalFormController } from './detail-animal-form-controller';

@Component({
  selector: 'app-detail-animal-page',
  templateUrl: './detail-animal-page.component.html',
  styleUrl: './detail-animal-page.component.scss'
})
export class DetailAnimalPageComponent extends DetailAnimalFormController implements OnInit {
  userLogged = {} as IEmployee;
  submitted = false;

  speciesList: { id: number; value: string; }[] = [];
  racesList: { id: number; value: string; }[] = [];
  sizeAnimalList: { id: number; value: string; }[] = SIZE_ANIMAL_MAP;
  statusAnimalList: { id: number; value: string; }[] = STATUS_ANIMAL_MAP;

  animalDetail = {} as IAnimal;
  animalId: string | null = null;

  private readonly _routerGet = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _animalsService = inject(AnimalsService);
  private readonly _racesService = inject(RacesService);
  private readonly _speciesService = inject(SpeciesService);

  ngOnInit() {
    this.animalId = this._routerGet.snapshot.paramMap.get('idAnimal');
  }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.getAnimalDetail();
  }

  getAnimalDetail() {
    if (this.animalId && !isNaN(Number(this.animalId))) {
      this._animalsService.getAnimal(Number(this.animalId)).pipe().subscribe({
        next: (animal) => {
          this.animalDetail = animal as IAnimal;
          this.fulfillDetailAnimalForm(this.animalDetail);
          this.filterSpeciesList(this.animalDetail.nameSpecies);
          this.filterRacesList(this.animalDetail.nameRace);
        },
        error: (error) => {
          alert(error);
          this._router.navigate(['/employees/view']);
        },
      });
    } else {
      alert('Não foi possivel visualizar esse animal');
      this._router.navigate(['/animals/view']);
    }
  }

  updateFormField(field: string, value: string) {
    this.detailAnimalForm.patchValue({ [field]: value });
  }

  filterSpeciesList(nameSpecies: string | undefined = undefined) {
    this._speciesService.getSpecies(nameSpecies).pipe().subscribe({
      next: (speciesList) => {
        const transformedSpeciesList = speciesList?.map((species) => ({
          id: species.idSpecies,
          value: species.nameSpecies
        }));
        this.speciesList = transformedSpeciesList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  filterRacesList(nameRaces: string | undefined = undefined) {
    this._racesService.getRaces(nameRaces).pipe().subscribe({
      next: (racesList) => {
        const transformedRacesList = racesList?.map((race) => ({
          id: race.idRace,
          value: race.nameRace
        }));
        this.racesList = transformedRacesList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  onSelectSpecies(event: { id: string, value: string }) {
    this.detailAnimalForm.patchValue({ 'nameSpecies': event.value });
    this.detailAnimalForm.patchValue({ 'idSpecies': event.id });
  }

  onSelectRace(event: { id: string, value: string }) {
    this.detailAnimalForm.patchValue({ 'nameRace': event.value });
    this.detailAnimalForm.patchValue({ 'idRace': event.id });
  }

  onSelectStatusAnimal(event: { id: string, value: string }) {
    this.detailAnimalForm.patchValue({ 'statusAnimal': event.value });
  }

  onSelectSize(event: { id: string, value: string }) {
    this.detailAnimalForm.patchValue({ 'size': event.value });
  }

  save() {
    this.submitted = true;
    if (this.detailAnimalForm.invalid) {
      alert('Erro ao enviar formulário de edição de animal!');
      return;
    }
    this._animalsService.putAnimal(this.animalDetail.idAnimal, {
      nameAnimal: this.detailAnimalForm.value.nameAnimal,
      size: this.detailAnimalForm.value.size,
      statusAnimal: this.detailAnimalForm.value.statusAnimal,
      description: this.detailAnimalForm.value.description,
      idSpecies: this.detailAnimalForm.value.idSpecies,
      idRace: this.detailAnimalForm.value.idRace,
    }).pipe().subscribe({
      next: (response) => {
        alert('Animal atualizado com sucesso!');
        this._router.navigate(['/animals/view']);
      },
      error: (error) => {
        alert(error);
      }
    })
  }

  del() {
    this._animalsService.deleteAnimal(Number(this.animalId)).pipe().subscribe({
      next: (response) => {
        alert('Animal deletado com sucesso!');
        this._router.navigate(['/animals/view']);
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  redirectToClinicalReportsView() {
    this._router.navigate([`/animals/${this.animalId}/clinical-reports/view`]);
  }

  redirectToClinicalReportsCreate() {
    this._router.navigate([`/animals/${this.animalId}/clinical-reports/create`]);
  }
}
