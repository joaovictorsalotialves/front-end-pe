import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { take } from 'rxjs';
import { EmployeesService } from '../../services/employees.service';
import { ROUTERS_ICONS_MAP } from "../../utils/routers-icons-map";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  textButton = 'Sing In';
  textHeader = 'Bem Vindo de Volta!';

  inputEmail = {
    type: 'email',
    id: 'email',
    name: 'email',
    placeholder: 'Email',
    icon: ROUTERS_ICONS_MAP.email,
    value: '',
  };

  inputPassword = {
    type: 'password',
    id: 'password',
    name: 'password',
    placeholder: 'Senha',
    icon: ROUTERS_ICONS_MAP.lock,
    value: '',
  };

  private readonly _router = inject(Router);
  private readonly _employeesService = inject(EmployeesService);

  redirectToRecoverPassword() {
    this._router.navigate(['/recover-password']);
  }

  onBlurInputEmail(value: string) {
    this.inputEmail.value = value;
  }

  onBlurInputPassword(value: string) {
    this.inputPassword.value = value;
  }

  login() {
    this._employeesService.loginEmployee(this.inputEmail.value, this.inputPassword.value).pipe(take(1)).subscribe({
      next: (token) => {
        localStorage.setItem('token', token!);
        this._router.navigate(['/home']);
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }
}
