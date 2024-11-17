import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AutocompleteFormComponent } from '../../../components/autocomplete-form/autocomplete-form.component';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { CitiesService } from '../../../services/cities.service';
import { StatesService } from '../../../services/states.service';
import { UsersService } from '../../../services/users.service';
import { RegistrationUserFormController } from './registration-user-form-controller';

@Component({
  selector: 'app-registration-user-page',
  templateUrl: './registration-user-page.component.html',
  styleUrl: './registration-user-page.component.scss'
})
export class RegistrationUserPageComponent extends RegistrationUserFormController {
  userLogged = {} as IEmployee;
  submitted = false;

  statesList: { id: number; value: string; }[] = [];
  citiesList: { id: number; value: string; }[] = [];

  idStateSelect: number | undefined = undefined;

  private readonly _router = inject(Router);
  private readonly _userService = inject(UsersService);
  private readonly _statesService = inject(StatesService);
  private readonly _citiesService = inject(CitiesService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterStatesList();
  }

  filterStatesList(nameState: string | undefined = undefined) {
    this._statesService.getStates(nameState).pipe().subscribe({
      next: (statesList) => {
        const transformedStatesList = statesList?.map((state) => ({
          id: state.idState,
          value: state.nameState
        }))
        this.statesList = transformedStatesList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  filterCitiesList(nameCity: string | undefined = undefined) {
    if (this.idStateSelect) {
      this._citiesService.getCitiesForState(this.idStateSelect!, nameCity).pipe().subscribe({
        next: (citiesList) => {
          const transformedCitiesList = citiesList?.map((city) => ({
            id: city.idCity,
            value: city.nameCity
          }))
          this.citiesList = transformedCitiesList || [];
        },
        error: (error) => {
          console.error(error.message);
        }
      });
    }
  }

  updateFormField(field: string, value: string) {
    this.registrationUserForm.patchValue({ [field]: value });
  }

  onSelectState(event: { id: string, value: string }, inputCity: AutocompleteFormComponent) {
    if (this.registrationUserForm.get('idState')?.value != event.id) {
      this.registrationUserForm.patchValue({ 'nameState': event.value });
      this.registrationUserForm.patchValue({ 'idState': event.id });
      inputCity.value = '';
      this.registrationUserForm.patchValue({ 'nameCity': '' });
      this.registrationUserForm.patchValue({ 'idCity': '' });
      this.idStateSelect = Number(event.id);
      this.filterCitiesList();
    }
  }

  onSelectCity(event: { id: string, value: string }) {
    this.registrationUserForm.patchValue({ 'nameCity': event.value });
    this.registrationUserForm.patchValue({ 'idCity': event.id });
  }

  save() {
    console.log(this.registrationUserForm)
    this.submitted = true;
    if (this.registrationUserForm.invalid) {
      alert('Erro ao enviar formulário de cadastro de usuario!');
      return;
    }

    this._userService.postUser({
      nameUser: this.registrationUserForm.value.nameUser,
      email: this.registrationUserForm.value.email,
      cellPhoneNumber: this.registrationUserForm.value.cellPhoneNumber,
      address: {
        publicPlace: this.registrationUserForm.value.publicPlace,
        neighborhood: this.registrationUserForm.value.neighborhood,
        number: this.registrationUserForm.value.number,
        complement: this.registrationUserForm.value.complement,
        idState: this.registrationUserForm.value.idState,
        idCity: this.registrationUserForm.value.idCity,
      },
    }).pipe().subscribe({
      next: (response) => {
        alert('Usuário cadastrado com sucesso!');
        this._router.navigate(['/home'])
      },
      error: (error) => {
        alert(error);
      }
    });
  }
}
