import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutocompleteFormComponent } from '../../../components/autocomplete-form/autocomplete-form.component';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { CitiesService } from '../../../services/cities.service';
import { EmployeesService } from '../../../services/employees.service';
import { StatesService } from '../../../services/states.service';
import { POSITIONS_MAP } from '../../../utils/positions-map';
import { DetailEmployeeFormController } from './detail-employee-form-controller';

@Component({
  selector: 'app-detail-employee-page',
  templateUrl: './detail-employee-page.component.html',
  styleUrl: './detail-employee-page.component.scss'
})
export class DetailEmployeePageComponent extends DetailEmployeeFormController implements OnInit {
  userLogged = {} as IEmployee;
  submitted = false;

  statesList: { id: number; value: string; }[] = [];
  citiesList: { id: number; value: string; }[] = [];
  positionsList: { id: number; value: string; }[] = POSITIONS_MAP;

  idStateSelect: number | undefined;

  employeeDetail = {} as IEmployee;
  employeeId: string | null = null;

  private readonly _routerGet = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _employeesService = inject(EmployeesService);
  private readonly _statesService = inject(StatesService);
  private readonly _citiesService = inject(CitiesService);

  ngOnInit() {
    this.employeeId = this._routerGet.snapshot.paramMap.get('idEmployee');
  }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    if (this.userLogged.position != 'Administrador') {
      alert('Usuario não possui permissão para acessar esse recurso!');
      this._router.navigate(['/home']);
    }
    this.getEmployeeDetail();
  }

  getEmployeeDetail() {
    if (this.employeeId && !isNaN(Number(this.employeeId))) {
      this._employeesService.getEmployee(Number(this.employeeId)).pipe().subscribe({
        next: (employee) => {
          this.employeeDetail = employee as IEmployee;
          this.fulfillDetailEmployeeForm(this.employeeDetail);
          this.filterStatesList(this.employeeDetail.address?.nameState);
          this.idStateSelect = this.employeeDetail.address?.idState;
          if (this.idStateSelect) {
            this.filterCitiesList(this.employeeDetail.address?.nameCity);
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
    this.detailEmployeeForm.patchValue({ [field]: value });
  }

  onSelectState(event: { id: string, value: string }, inputCity: AutocompleteFormComponent) {
    if (this.detailEmployeeForm.get('idState')?.value != event.id) {
      this.detailEmployeeForm.patchValue({ 'nameState': event.value });
      this.detailEmployeeForm.patchValue({ 'idState': event.id });
      inputCity.value = '';
      this.detailEmployeeForm.patchValue({ 'nameCity': '' });
      this.detailEmployeeForm.patchValue({ 'idCity': '' });
      this.idStateSelect = Number(event.id);
      this.filterCitiesList();
    }
  }

  onSelectCity(event: { id: string, value: string }) {
    this.detailEmployeeForm.patchValue({ 'nameCity': event.value });
    this.detailEmployeeForm.patchValue({ 'idCity': event.id });
  }

  onSelectPosition(event: { id: string, value: string }) {
    this.detailEmployeeForm.patchValue({ 'position': event.value });
  }

  save() {
    this.submitted = true;
    if (this.detailEmployeeForm.invalid) {
      alert('Erro ao enviar formulário de edição de fúncionario!');
      return;
    }

    this._employeesService.putEmployee(this.employeeDetail.idEmployee, {
      nameEmployee: this.detailEmployeeForm.value.nameEmployee,
      email: this.detailEmployeeForm.value.email,
      cellPhoneNumber: this.detailEmployeeForm.value.cellPhoneNumber,
      position: this.detailEmployeeForm.value.position,
      address: {
        publicPlace: this.detailEmployeeForm.value.publicPlace,
        neighborhood: this.detailEmployeeForm.value.neighborhood,
        number: this.detailEmployeeForm.value.number,
        complement: this.detailEmployeeForm.value.complement,
        idState: this.detailEmployeeForm.value.idState,
        idCity: this.detailEmployeeForm.value.idCity,
      },
    }).pipe().subscribe({
      next: (response) => {
        alert('Fúncionario atualizado com sucesso!');
        this._router.navigate(['/employees/view']);
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  del() {
    this._employeesService.deleteEmployee(Number(this.employeeId)).pipe().subscribe({
      next: (response) => {
        alert('Fúncionario deletado com sucesso!');
        this._router.navigate(['/employees/view']);
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}