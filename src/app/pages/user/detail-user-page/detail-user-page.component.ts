import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutocompleteFormComponent } from '../../../components/autocomplete-form/autocomplete-form.component';
import { IAddressRequest } from '../../../interfaces/address/address-request.interface';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { IUser } from '../../../interfaces/users/user.interface';
import { CitiesService } from '../../../services/cities.service';
import { StatesService } from '../../../services/states.service';
import { UsersService } from '../../../services/users.service';
import { DetailUserFormController } from './detail-user-form-controller';

@Component({
  selector: 'app-detail-user-page',
  templateUrl: './detail-user-page.component.html',
  styleUrl: './detail-user-page.component.scss'
})
export class DetailUserPageComponent extends DetailUserFormController {
  userLogged = {} as IEmployee;
  submitted = false;

  statesList: { id: number; value: string; }[] = [];
  citiesList: { id: number; value: string; }[] = [];

  idStateSelect: number | undefined;

  userDetail = {} as IUser;
  userId: string | null = null;

  private readonly _routerGet = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _usersService = inject(UsersService);
  private readonly _statesService = inject(StatesService);
  private readonly _citiesService = inject(CitiesService);

  ngOnInit() {
    this.userId = this._routerGet.snapshot.paramMap.get('idUser');
  }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.getUserDetail();
  }

  getUserDetail() {
    if (this.userId && !isNaN(Number(this.userId))) {
      this._usersService.getUser(Number(this.userId)).pipe().subscribe({
        next: (user) => {
          this.userDetail = user as IUser;
          this.fulfillDetailUserForm(this.userDetail);
          this.filterStatesList(this.userDetail.address?.nameState);
          this.idStateSelect = this.userDetail.address?.idState;
          if (this.idStateSelect) {
            this.filterCitiesList(this.userDetail.address?.nameCity);
          }
        },
        error: (error) => {
          alert(error);
          this._router.navigate(['/employees/view']);
        },
      });
    } else {
      alert('Não foi possivel visualizar esse fúncionario');
      this._router.navigate(['/employees/view']);
    }
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
    this.detailUserForm.patchValue({ [field]: value });
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

    if (this.detailUserForm.invalid) {
      alert('Erro ao enviar formulário de edição de fúncionario!');
      return;
    }

    this._usersService.putUser(this.userDetail.idUser, {
      nameUser: this.personal_information.value.nameUser,
      email: this.personal_information.value.email,
      cellPhoneNumber: this.personal_information.value.cellPhoneNumber,
      address: addressObj ? addressObj : undefined,
    }).pipe().subscribe({
      next: (response) => {
        alert('Usúario atualizado com sucesso!');
        this._router.navigate(['/users/view']);
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  del() {
    this._usersService.deleteUser(Number(this.userId)).pipe().subscribe({
      next: (response) => {
        alert('Usúario deletado com sucesso!');
        this._router.navigate(['/users/view']);
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
