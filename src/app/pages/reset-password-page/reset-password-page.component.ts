import { Component, inject, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { take } from 'rxjs';
import { EmployeesService } from '../../services/employees.service';
import { ROUTERS_ICONS_MAP } from '../../utils/routers-icons-map';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.scss'
})
export class ResetPasswordPageComponent implements OnInit {
  textButton = 'Alterar Senha';
  textHeader = 'Alterar Senha!';

  inputPassword = {
    type: 'password',
    id: 'password',
    name: 'password',
    placeholder: 'Senha',
    icon: ROUTERS_ICONS_MAP.lock,
    value: '',
  };

  inputPasswordCheck = {
    type: 'password',
    id: 'passwordCheck',
    name: 'passwordCheck',
    placeholder: 'Repetir Senha',
    icon: ROUTERS_ICONS_MAP.lock,
    value: '',
  };

  inputCode = {
    type: 'text',
    id: 'code',
    name: 'code',
    placeholder: 'Código de verificação',
    icon: ROUTERS_ICONS_MAP.lock,
    value: '',
  };

  private readonly _router = inject(Router);
  private readonly _employeesService = inject(EmployeesService);

  token: string | null = null;
  ngOnInit() {
    this.token = localStorage.getItem('resetPasswordToken');
    if (!this.token) {
      this._router.navigate(['/recover-password']);
    }
  }

  onBlurInputPassword(value: string) {
    this.inputPassword.value = value;
  }

  onBlurInputPasswordCheck(value: string) {
    this.inputPasswordCheck.value = value;
  }

  onBlurInputCode(value: string) {
    this.inputCode.value = value;
  }

  resetPassword() {
    this._employeesService.resetPasswordEmployee(
      this.inputPassword.value, this.inputPasswordCheck.value, this.inputCode.value, this.token!
    ).pipe(take(1)).subscribe({
      next: (response) => {
        this._router.navigate(['/login'])
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }
}
