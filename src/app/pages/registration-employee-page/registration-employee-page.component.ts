import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AutocompleteFormComponent } from '../../components/autocomplete-form/autocomplete-form.component';
import { IEmployee } from '../../interfaces/employees/employee.interface';
import { CitiesService } from '../../services/cities.service';
import { EmployeesService } from '../../services/employees.service';
import { StatesService } from '../../services/states.service';
import { POSITIONS_MAP } from '../../utils/positions-map';
import { RegistrationEmployeeFormController } from './registration-employee-form-controller';

@Component({
  selector: 'app-registration-employee-page',
  templateUrl: './registration-employee-page.component.html',
  styleUrl: './registration-employee-page.component.scss'
})
export class RegistrationEmployeePageComponent extends RegistrationEmployeeFormController {
  userLogged = {} as IEmployee;

  statesList: { id: number; value: string; }[] = [];
  citiesList: { id: number; value: string; }[] = [];
  positionsList: { id: number; value: string; }[] = POSITIONS_MAP;

  idStateSelect: number | undefined = undefined;

  private readonly _router = inject(Router);
  private readonly _employeesService = inject(EmployeesService);
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
    this.registrationEmployeeForm.patchValue({ [field]: value });
  }

  onSelectState(event: { id: string, value: string }, inputCity: AutocompleteFormComponent) {
    if (this.registrationEmployeeForm.get('idState')?.value != event.id) {
      this.registrationEmployeeForm.patchValue({ 'nameState': event.value });
      this.registrationEmployeeForm.patchValue({ 'idState': event.id });
      inputCity.value = '';
      this.registrationEmployeeForm.patchValue({ 'nameCity': '' });
      this.registrationEmployeeForm.patchValue({ 'idCity': '' });
      this.idStateSelect = Number(event.id);
      this.filterCitiesList();
    }
  }

  onSelectCity(event: { id: string, value: string }) {
    this.registrationEmployeeForm.patchValue({ 'nameCity': event.value });
    this.registrationEmployeeForm.patchValue({ 'idCity': event.id });
  }

  onSelectPosition(event: { id: string, value: string }) {
    this.registrationEmployeeForm.patchValue({ 'position': event.value });
  }

  save() {
    this._employeesService.postEmployee({
      nameEmployee: this.registrationEmployeeForm.value.nameEmployee,
      email: this.registrationEmployeeForm.value.email,
      cellPhoneNumber: this.registrationEmployeeForm.value.cellPhoneNumber,
      password: this.registrationEmployeeForm.value.cellPhoneNumber,
      passwordCheck: this.registrationEmployeeForm.value.cellPhoneNumber,
      position: this.registrationEmployeeForm.value.position,
      address: {
        publicPlace: this.registrationEmployeeForm.value.publicPlace,
        neighborhood: this.registrationEmployeeForm.value.neighborhood,
        number: this.registrationEmployeeForm.value.number,
        complement: this.registrationEmployeeForm.value.complement,
        idState: this.registrationEmployeeForm.value.idState,
        idCity: this.registrationEmployeeForm.value.idCity,
      },
    }).pipe().subscribe({
      next: (response) => {
        alert('Fúncionario cadastrado com sucesso!');
      },
      error: (error) => {
        console.log(error);
        alert('Falha ao cadastrar fúncionario!');
      }
    });
  }
}
