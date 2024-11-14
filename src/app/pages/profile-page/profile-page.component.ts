import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AutocompleteFormComponent } from '../../components/autocomplete-form/autocomplete-form.component';
import { IEmployee } from '../../interfaces/employees/employee.interface';
import { CitiesService } from '../../services/cities.service';
import { EmployeesService } from '../../services/employees.service';
import { StatesService } from '../../services/states.service';
import { POSITIONS_MAP } from '../../utils/positions-map';
import { ProfileFormController } from './profile-form-controller';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent extends ProfileFormController {
  userLogged = {} as IEmployee;

  statesList: { id: number; value: string; }[] = [];
  citiesList: { id: number; value: string; }[] = [];
  positionsList: { id: number; value: string; }[] = POSITIONS_MAP;

  idStateSelect: number | undefined;

  private readonly _router = inject(Router);
  private readonly _employeesService = inject(EmployeesService);
  private readonly _statesService = inject(StatesService);
  private readonly _citiesService = inject(CitiesService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.fulfillProfileForm(this.userLogged);
    this.filterStatesList(this.userLogged.address?.nameState);
    this.idStateSelect = this.userLogged.address?.idState;
    if (this.idStateSelect) {
      this.filterCitiesList(this.userLogged.address?.nameCity);
    }
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

  updateFormField(field: string, value: string) {
    this.profileForm.patchValue({ [field]: value });
  }

  onSelectState(event: { id: string, value: string }, inputCity: AutocompleteFormComponent) {
    if (this.profileForm.get('idState')?.value != event.id) {
      this.profileForm.patchValue({ 'nameState': event.value });
      this.profileForm.patchValue({ 'idState': event.id });
      inputCity.value = '';
      this.profileForm.patchValue({ 'nameCity': '' });
      this.profileForm.patchValue({ 'idCity': '' });
      this.idStateSelect = Number(event.id);
      this.filterCitiesList();
    }
  }

  onSelectCity(event: { id: string, value: string }) {
    this.profileForm.patchValue({ 'nameCity': event.value });
    this.profileForm.patchValue({ 'idCity': event.id });
  }

  onSelectPosition(event: { id: string, value: string }) {
    this.profileForm.patchValue({ 'position': event.value });
  }

  save() {
    this.profileForm.get('position')?.enable();
    this._employeesService.putEmployee(this.userLogged.idEmployee, {
      nameEmployee: this.profileForm.value.nameEmployee,
      email: this.profileForm.value.email,
      cellPhoneNumber: this.profileForm.value.cellPhoneNumber,
      position: this.profileForm.value.position,
      address: {
        publicPlace: this.profileForm.value.publicPlace,
        neighborhood: this.profileForm.value.neighborhood,
        number: this.profileForm.value.number,
        complement: this.profileForm.value.complement,
        idState: this.profileForm.value.idState,
        idCity: this.profileForm.value.idCity,
      },
    }).pipe().subscribe({
      next: (response) => {
        this.userLogged = {
          idEmployee: this.userLogged.idEmployee,
          nameEmployee: this.profileForm.value.nameEmployee,
          email: this.profileForm.value.email,
          cellPhoneNumber: this.profileForm.value.cellPhoneNumber,
          position: this.profileForm.value.position,
          Addresses_idAddress: this.userLogged.Addresses_idAddress,
          address: {
            idAddress: this.userLogged.address?.idAddress!,
            publicPlace: this.profileForm.value.publicPlace,
            neighborhood: this.profileForm.value.neighborhood,
            number: this.profileForm.value.number,
            complement: this.profileForm.value.complement,
            idState: this.profileForm.value.idState,
            nameState: this.profileForm.value.nameState,
            idCity: this.profileForm.value.idCity,
            nameCity: this.profileForm.value.nameCity,
          },
        };
        this.profileForm.get('position')?.disable();
        localStorage.setItem('user', JSON.stringify(this.userLogged));
        alert('Perfil atualizado com sucesso!');
        this._router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error);
        alert('Falha aou atualizar o perfil!');
      }
    });
  }

  redirectToUpdatePassword() {
    this._router.navigate(['/profile/password']);
  }
}
