import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { EmployeesService } from '../../services/employees.service';
import { ROUTERS_ICONS_MAP } from '../../utils/routers-icons-map';

@Component({
  selector: 'app-recover-password-page',
  templateUrl: './recover-password-page.component.html',
  styleUrl: './recover-password-page.component.scss'
})
export class RecoverPasswordPageComponent {
  recoverPasswordForm: FormGroup;

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
  private readonly _fb = inject(FormBuilder);

  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor() {
    this.recoverPasswordForm = this._fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    });
  }

  onBlurInputEmail(value: string) {
    this.recoverPasswordForm.patchValue({ email: value });
  }

  recoverPassword() {
    if (this.recoverPasswordForm.valid) {
      const { email } = this.recoverPasswordForm.value;
      this._employeesService.forgotPasswordEmployee(email).pipe(take(1)).subscribe({
        next: (token) => {
          localStorage.setItem('resetPasswordToken', token!);
          this._router.navigate(['/reset-password'])
        },
        error: (error) => {
          alert(error.message);
        }
      });
    }
  }

  redirectToLogin() {
    this._router.navigate(['/login']);
  }
}
