import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    'type': 'email',
    'id': 'email',
    'name': 'email',
    'placeholder': 'Email',
    'icon': ROUTERS_ICONS_MAP.email,
  };

  constructor(
    private readonly _router: Router
  ) { }

  redirectToLogin() {
    this._router.navigate(['/login']);
  }
}
