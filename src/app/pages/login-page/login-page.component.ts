import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { EmployeesService } from '../../services/employees.service';
import { ROUTERS_ICONS_MAP } from '../../utils/routers-icons-map';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loginForm: FormGroup;

  routersIconsMap = ROUTERS_ICONS_MAP;

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

  onInputEmail(value: string) {
    this.loginForm.patchValue({ email: value });
  }

  onInputPassword(value: string) {
    this.loginForm.patchValue({ password: value });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this._employeesService.loginEmployee(email, password).pipe(take(1)).subscribe({
        next: (loginResponse) => {
          localStorage.setItem('authToken', loginResponse!.token!);
          localStorage.setItem('user', JSON.stringify(loginResponse!.user!));
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
