import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutocompleteFormComponent } from '../../../components/autocomplete-form/autocomplete-form.component';
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
        },
      });
    } else {
      alert('Não foi possivel visualizar esse fúncionario');
      this._router.navigate(['/employees/view'])
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
    this.detailUserForm.patchValue({ [field]: value });
  }

  onSelectState(event: { id: string, value: string }, inputCity: AutocompleteFormComponent) {
    if (this.detailUserForm.get('idState')?.value != event.id) {
      this.detailUserForm.patchValue({ 'nameState': event.value });
      this.detailUserForm.patchValue({ 'idState': event.id });
      inputCity.value = '';
      this.detailUserForm.patchValue({ 'nameCity': '' });
      this.detailUserForm.patchValue({ 'idCity': '' });
      this.idStateSelect = Number(event.id);
      this.filterCitiesList();
    }
  }

  onSelectCity(event: { id: string, value: string }) {
    this.detailUserForm.patchValue({ 'nameCity': event.value });
    this.detailUserForm.patchValue({ 'idCity': event.id });
  }

  save() {
    this.submitted = true;
    if (this.detailUserForm.invalid) {
      alert('Erro ao enviar formulário de edição de fúncionario!');
      return;
    }

    console.log(this.detailUserForm)

    this._usersService.putUser(this.userDetail.idUser, {
      nameUser: this.detailUserForm.value.nameUser,
      email: this.detailUserForm.value.email,
      cellPhoneNumber: this.detailUserForm.value.cellPhoneNumber,
      address: {
        publicPlace: this.detailUserForm.value.publicPlace,
        neighborhood: this.detailUserForm.value.neighborhood,
        number: this.detailUserForm.value.number,
        complement: this.detailUserForm.value.complement,
        idState: this.detailUserForm.value.idState,
        idCity: this.detailUserForm.value.idCity,
      },
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
