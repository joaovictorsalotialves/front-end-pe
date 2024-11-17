import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { EmployeesService } from '../../../services/employees.service';
import { ROUTERS_ICONS_MAP } from '../../../utils/routers-icons-map';
import { UpdatePasswordFormController } from './update-password-form-controller';

@Component({
  selector: 'app-update-password-page',
  templateUrl: './update-password-page.component.html',
  styleUrl: './update-password-page.component.scss'
})
export class UpdatePasswordPageComponent extends UpdatePasswordFormController {
  routersIconsMap = ROUTERS_ICONS_MAP;

  userLogged = {} as IEmployee;
  submitted = false;

  private readonly _employeesService = inject(EmployeesService);
  private readonly _router = inject(Router);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
  }

  updateFormField(field: string, value: string) {
    this.updatePasswordForm.patchValue({ [field]: value });
  }

  save() {
    this.submitted = true;
    if (this.updatePasswordForm.invalid) {
      alert('Erro ao enviar formulário de edição de senha!');
      return;
    }

    this._employeesService.patchPasswordEmployee(
      this.userLogged.idEmployee,
      this.updatePasswordForm.value.oldPassword,
      this.updatePasswordForm.value.newPassword,
      this.updatePasswordForm.value.passwordCheck,
    ).pipe().subscribe({
      next: (response) => {
        alert('Senha alterada com sucesso!');
        this._router.navigate(['/home']);
      },
      error: (error) => {
        alert(error);
      },
    })
  }
}
