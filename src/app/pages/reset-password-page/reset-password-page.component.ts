import { Component } from '@angular/core';

import { ROUTERS_ICONS_MAP } from '../../utils/routers-icons-map';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.scss'
})
export class ResetPasswordPageComponent {
  textButton = 'Alterar Senha';
  textHeader = 'Alterar Senha!';

  inputPassword = {
    'type': 'password',
    'id': 'password',
    'name': 'password',
    'placeholder': 'Senha',
    'icon': ROUTERS_ICONS_MAP.lock,
  };

  inputPasswordCheck = {
    'type': 'password',
    'id': 'passwordCheck',
    'name': 'passwordCheck',
    'placeholder': 'Repetir Senha',
    'icon': ROUTERS_ICONS_MAP.lock,
  };
}
