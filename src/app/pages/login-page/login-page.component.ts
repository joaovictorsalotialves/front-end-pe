import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    'type': 'email',
    'id': 'email',
    'name': 'email',
    'placeholder': 'Email',
    'icon': ROUTERS_ICONS_MAP.email,
  };

  inputPassword = {
    'type': 'password',
    'id': 'password',
    'name': 'password',
    'placeholder': 'Senha',
    'icon': ROUTERS_ICONS_MAP.lock,
  };

  constructor(
    private readonly _router: Router,
    private readonly _employeesService: EmployeesService,
  ) { }

  redirectToRecoverPassword() {
    this._router.navigate(['/recover-password']);
  }

  login() {
    this._employeesService.loginEmployee().subscribe((token) => {
      this._router.navigate(['/recover-password']);
    });
  }
}
