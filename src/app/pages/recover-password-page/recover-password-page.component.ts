import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { take } from 'rxjs';
import { EmployeesService } from '../../services/employees.service';
import { ROUTERS_ICONS_MAP } from '../../utils/routers-icons-map';

@Component({
  selector: 'app-recover-password-page',
  templateUrl: './recover-password-page.component.html',
  styleUrl: './recover-password-page.component.scss'
})
export class RecoverPasswordPageComponent {
  textButton = 'Recuperar Senha';
  textHeader = 'Recuperar Senha!';

  inputEmail = {
    type: 'email',
    id: 'email',
    name: 'email',
    placeholder: 'Email',
    icon: ROUTERS_ICONS_MAP.email,
    value: ''
  };

  private readonly _router = inject(Router);
  private readonly _employeesService = inject(EmployeesService);

  onBlurInputEmail(value: string) {
    this.inputEmail.value = value;
  }

  recoverPassword() {
    this._employeesService.forgotPasswordEmployee(this.inputEmail.value).pipe(take(1)).subscribe({
      next: (token) => {
        localStorage.setItem('resetPasswordToken', token!);
        this._router.navigate(['/reset-password'])
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }

  redirectToLogin() {
    this._router.navigate(['/login']);
  }
}
