import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { AdoptionsService } from '../../../services/adoptions.service';
import { AnimalsService } from '../../../services/animals.service';
import { UsersService } from '../../../services/users.service';
import { STATUS_ADOPTION_MAP } from '../../../utils/status-adoption-map';
import { RegistrationAdoptionFormController } from './registration-adoption-form-controller';

@Component({
  selector: 'app-registration-adoption-page',
  templateUrl: './registration-adoption-page.component.html',
  styleUrl: './registration-adoption-page.component.scss'
})
export class RegistrationAdoptionPageComponent extends RegistrationAdoptionFormController {
  userLogged = {} as IEmployee;
  submitted = false;

  animalsList: { id: number; value: string; }[] = []
  usersList: { id: number; value: string; }[] = []
  statusAdoptionList = STATUS_ADOPTION_MAP;

  private readonly _router = inject(Router);
  private readonly _adoptionsService = inject(AdoptionsService);
  private readonly _animalsService = inject(AnimalsService);
  private readonly _usersServices = inject(UsersService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterAnimalList();
    this.filterUsersList();
  }

  updateFormField(field: string, value: string) {
    this.registrationAdoptionForm.patchValue({ [field]: value });
  }

  filterAnimalList(nameAnimal: string | undefined = undefined) {
    this._animalsService.getAnimals(nameAnimal).pipe().subscribe({
      next: (animalsList) => {
        const transformedAnimalsList = animalsList?.map((animal) => ({
          id: animal.idAnimal,
          value: animal.nameAnimal + ' - ' + animal.nameRace
        }))
        this.animalsList = transformedAnimalsList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  filterUsersList(nameUser: string | undefined = undefined) {
    this._usersServices.getUsers(nameUser).pipe().subscribe({
      next: (usersList) => {
        const transformedUsersList = usersList?.map((user) => ({
          id: user.idUser,
          value: user.nameUser
        }))
        this.usersList = transformedUsersList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  onSelectAnimal(event: { id: string, value: string }) {
    this.registrationAdoptionForm.patchValue({ 'nameAnimal': event.value });
    this.registrationAdoptionForm.patchValue({ 'idAnimal': event.id });
  }

  onSelectUser(event: { id: string, value: string }) {
    this.registrationAdoptionForm.patchValue({ 'nameUser': event.value });
    this.registrationAdoptionForm.patchValue({ 'idUser': event.id });
  }

  onSelectStatusAdoption(event: { id: string, value: string }) {
    this.registrationAdoptionForm.patchValue({ 'statusAdoption': event.value });
  }

  save() {
    this.submitted = true;
    if (this.registrationAdoptionForm.invalid) {
      alert('Erro ao enviar formulário de cadastro de adoção!');
      return;
    }
    this._adoptionsService.postAdoption({
      idAnimal: this.registrationAdoptionForm.value.idAnimal,
      idUser: this.registrationAdoptionForm.value.idUser,
      statusAdoption: this.registrationAdoptionForm.value.statusAdoption,
    }).pipe().subscribe({
      next: (response) => {
        alert('Adoção cadastrada com sucesso!');
        this._router.navigate(['/home'])
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
