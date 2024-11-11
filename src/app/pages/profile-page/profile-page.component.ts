import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEmployee } from '../../interfaces/employees/employee.interface';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileForm: FormGroup;
  userLogged = {} as IEmployee;

  inputFullName = {
    type: 'text',
    id: 'fullName',
    name: 'fullName',
    placeholder: 'Nome Completo',
  };

  inputEmail = {
    type: 'email',
    id: 'email',
    name: 'email',
    placeholder: 'Email',
  };

  inputCellPhone = {
    type: 'text',
    id: 'cellPhoneNumber',
    name: 'cellPhoneNumber',
    placeholder: 'Número de Telefone',
  };

  private readonly _router = inject(Router);
  private readonly _employeesService = inject(EmployeesService);
  private readonly _fb = inject(FormBuilder);

  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private cellPhonePattern = /^(0[1-9]{2})[1-9][0-9]{7,8}$/;

  constructor() {
    this.profileForm = this._fb.group({
      nameEmployee: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      cellPhoneNumber: ['', [Validators.required, Validators.pattern(this.cellPhonePattern)]],
      publicPlace: ['', Validators.required],
      neighborhood: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      idState: [null, Validators.required],
      idCity: [null, Validators.required],
    });
  }

  getUser(user: IEmployee) {
    this.userLogged = user;
    this.profileForm.patchValue({
      nameEmployee: this.userLogged.nameEmployee,
      email: this.userLogged.email,
      cellPhoneNumber: this.userLogged.cellPhoneNumber,
      publicPlace: this.userLogged.address?.publicPlace,
      neighborhood: this.userLogged.address?.neighborhood,
      number: this.userLogged.address?.number,
      complement: this.userLogged.address?.complement,
      nameState: this.userLogged.address?.nameState,
      nameCity: this.userLogged.address?.nameCity
    });
  }

  onBlurFullName(value: string) {
    this.profileForm.patchValue({ nameEmployee: value });
  }

  onBlurEmail(value: string) {
    this.profileForm.patchValue({ email: value });
  }

  onBlurCellPhoneNumber(value: string) {
    this.profileForm.patchValue({ cellPhoneNumber: value });
  }
}
