import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { AnimalsService } from '../../../services/animals.service';
import { SpeciesService } from '../../../services/especies.service';
import { RacesService } from '../../../services/races.service';
import { SIZE_ANIMAL_MAP } from '../../../utils/size-animal-map';
import { STATUS_ANIMAL_MAP } from '../../../utils/status-animal-map';
import { RegistrationAnimalFormController } from './registration-animal-form-controller';

@Component({
  selector: 'app-registration-animal-page',
  templateUrl: './registration-animal-page.component.html',
  styleUrl: './registration-animal-page.component.scss'
})
export class RegistrationAnimalPageComponent extends RegistrationAnimalFormController {
  userLogged = {} as IEmployee;
  submitted = false;

  speciesList: { id: number; value: string; }[] = [];
  racesList: { id: number; value: string; }[] = [];
  sizeAnimalList: { id: number; value: string; }[] = SIZE_ANIMAL_MAP;
  statusAnimalList: { id: number; value: string; }[] = STATUS_ANIMAL_MAP;

  private readonly _router = inject(Router);
  private readonly _animalsService = inject(AnimalsService);
  private readonly _racesService = inject(RacesService);
  private readonly _speciesService = inject(SpeciesService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterSpeciesList();
    this.filterRacesList();
  }

  updateFormField(field: string, value: string) {
    this.registrationAnimalForm.patchValue({ [field]: value });
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
    this.registrationAnimalForm.patchValue({ 'nameSpecies': event.value });
    this.registrationAnimalForm.patchValue({ 'idSpecies': event.id });
  }

  onSelectRace(event: { id: string, value: string }) {
    this.registrationAnimalForm.patchValue({ 'nameRace': event.value });
    this.registrationAnimalForm.patchValue({ 'idRace': event.id });
  }

  onSelectStatusAnimal(event: { id: string, value: string }) {
    this.registrationAnimalForm.patchValue({ 'statusAnimal': event.value });
  }

  onSelectSize(event: { id: string, value: string }) {
    this.registrationAnimalForm.patchValue({ 'size': event.value });
  }

  save() {
    this.submitted = true;
    if (this.registrationAnimalForm.invalid) {
      alert('Erro ao enviar formulário de cadastro de animal!');
      return;
    }
    this._animalsService.postAnimal({
      nameAnimal: this.registrationAnimalForm.value.nameAnimal,
      size: this.registrationAnimalForm.value.size,
      statusAnimal: this.registrationAnimalForm.value.statusAnimal,
      description: this.registrationAnimalForm.value.description,
      idSpecies: this.registrationAnimalForm.value.idSpecies,
      idRace: this.registrationAnimalForm.value.idRace,
    }).pipe().subscribe({
      next: (response) => {
        alert('Animal cadastrada com sucesso!');
        this._router.navigate(['/home']);
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
