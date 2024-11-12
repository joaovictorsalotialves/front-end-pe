import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../../interfaces/employees/employee.interface';
import { CitiesService } from '../../services/cities.service';
import { EmployeesService } from '../../services/employees.service';
import { StatesService } from '../../services/states.service';
import { CitiesList } from '../../types/cities-list';
import { StatesList } from '../../types/states-list';
import { ProfileFormController } from './profile-form-controller';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent extends ProfileFormController {
  userLogged = {} as IEmployee;

  statesList: StatesList = [];
  citiesList: CitiesList = [];

  private readonly _router = inject(Router);
  private readonly _employeesService = inject(EmployeesService);
  private readonly _statesService = inject(StatesService);
  private readonly _citiesService = inject(CitiesService);

  constructor() {
    super()
  }

  getUser(user: IEmployee) {
    this.userLogged = user;
    this.fulfillProfileForm(this.userLogged);
  }

  filterStatesList(nameState: string | undefined = undefined) {
    this._statesService.getStates(nameState).pipe().subscribe({
      next: (statesList) => {
        this.statesList = statesList!;
        console.log(statesList);
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  updateProfileFormField(field: string, value: string) {
    this.profileForm.patchValue({ [field]: value });
  }

  save() {
    console.log(this.profileForm)
  }
}
