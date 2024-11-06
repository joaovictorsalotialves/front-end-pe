import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { EmployeesService } from '../../services/employees.service';
import { ROUTERS_ICONS_MAP } from "../../utils/routers-icons-map";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loginForm: FormGroup;

  textButton = 'Sing In';
  textHeader = 'Bem Vindo de Volta!';

  inputEmail = {
    type: 'email',
    id: 'email',
    name: 'email',
    placeholder: 'Email',
    icon: ROUTERS_ICONS_MAP.email,
  };

  inputPassword = {
    type: 'password',
    id: 'password',
    name: 'password',
    placeholder: 'Senha',
    icon: ROUTERS_ICONS_MAP.lock,
  };

  private readonly _router = inject(Router);
  private readonly _employeesService = inject(EmployeesService);
  private readonly _fb = inject(FormBuilder);

  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required],
    });
  }

  onBlurInputEmail(value: string) {
    this.loginForm.patchValue({ email: value });
  }

  onBlurInputPassword(value: string) {
    this.loginForm.patchValue({ password: value });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this._employeesService.loginEmployee(email, password).pipe(take(1)).subscribe({
        next: (token) => {
          localStorage.setItem('authToken', token!);
          this._router.navigate(['/home']);
        },
        error: (error) => {
          alert(error.message);
        }
      });
    }
  }

  redirectToRecoverPassword() {
    this._router.navigate(['/recover-password']);
  }
}
