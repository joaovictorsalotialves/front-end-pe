import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AutocompleteFormComponent } from '../../../components/autocomplete-form/autocomplete-form.component';
import { IAddressRequest } from '../../../interfaces/address/address-request.interface';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { CitiesService } from '../../../services/cities.service';
import { EmployeesService } from '../../../services/employees.service';
import { StatesService } from '../../../services/states.service';
import { POSITIONS_MAP } from '../../../utils/positions-map';
import { RegistrationEmployeeFormController } from './registration-employee-form-controller';

@Component({
  selector: 'app-registration-employee-page',
  templateUrl: './registration-employee-page.component.html',
  styleUrl: './registration-employee-page.component.scss'
})
export class RegistrationEmployeePageComponent extends RegistrationEmployeeFormController {
  userLogged = {} as IEmployee;
  submitted = false;

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
    if (this.userLogged.position != 'Administrador') {
      alert('Usuario não possui permissão para acessar esse recurso!');
      this._router.navigate(['/home']);
    }
    this.filterStatesList();
  }

  filterStatesList(nameState: string | undefined = undefined, inputCity?: AutocompleteFormComponent) {
    this.address_information.get('idState')?.reset('');
    this.idStateSelect = undefined;
    this.citiesList = [];

    if (inputCity) {
      this.address_information.get('idCity')?.reset('');
      this.address_information.get('nameCity')?.reset('');
      inputCity.reset();
    }

    const addressFields = this.address_information.value;
    const isAddressEmpty = !addressFields.publicPlace && !addressFields.neighborhood && !addressFields.number &&
      !addressFields.complement && !addressFields.nameState && !addressFields.nameCity;

    if (isAddressEmpty) {
      this.address_information.markAsPristine();
      this.address_information.markAsUntouched();
    }

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
    this.address_information.get('idCity')?.reset('');

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
    if (this.address_information.get('idState')?.value != event.id) {
      this.address_information.patchValue({ 'nameState': event.value });
      this.address_information.patchValue({ 'idState': event.id });
      this.filterStatesList(event.value);
      inputCity.reset();
      this.address_information.patchValue({ 'nameCity': '' });
      this.address_information.patchValue({ 'idCity': '' });
      this.idStateSelect = Number(event.id);
      this.filterCitiesList();
    }
  }

  onSelectCity(event: { id: string, value: string }) {
    this.address_information.patchValue({ 'nameCity': event.value });
    this.address_information.patchValue({ 'idCity': event.id });
  }

  onSelectPosition(event: { id: string, value: string }) {
    this.personal_information.patchValue({ 'position': event.value });
  }

  save() {
    this.submitted = true;

    const addressFields = this.address_information.value;
    const isAddressEmpty = !addressFields.publicPlace && !addressFields.neighborhood && !addressFields.number &&
      !addressFields.complement && !addressFields.nameState && !addressFields.nameCity;

    let addressObj: IAddressRequest | undefined = undefined;
    if (isAddressEmpty) {
      this.address_information.reset();
      this.address_information.markAsPristine();
      this.address_information.markAsUntouched();
    } else {
      addressObj = {
        publicPlace: addressFields.publicPlace,
        neighborhood: addressFields.neighborhood,
        number: addressFields.number,
        complement: addressFields.complement,
        idState: addressFields.idState,
        idCity: addressFields.idCity,
      }
    }

    if (this.registrationEmployeeForm.invalid) {
      alert('Erro ao enviar formulário de cadastro de fúncionario!');
      return;
    }

    this._employeesService.postEmployee({
      nameEmployee: this.personal_information.value.nameEmployee,
      email: this.personal_information.value.email,
      cellPhoneNumber: this.personal_information.value.cellPhoneNumber,
      password: this.personal_information.value.cellPhoneNumber,
      passwordCheck: this.personal_information.value.cellPhoneNumber,
      position: this.personal_information.value.position,
      address: addressObj ? addressObj : undefined,
    }).pipe().subscribe({
      next: (response) => {
        alert('Fúncionario cadastrado com sucesso!');
        this._router.navigate(['/home'])
      },
      error: (error) => {
        alert(error);
      }
    });
  }
}
