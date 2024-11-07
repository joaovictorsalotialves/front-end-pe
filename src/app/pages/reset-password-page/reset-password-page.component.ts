import { Component, inject, OnInit } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  resetPasswordForm: FormGroup;

  textButton = 'Alterar Senha';
  textHeader = 'Alterar Senha!';

  inputNewPassword = {
    type: 'password',
    id: 'newPassword',
    name: 'newPassword',
    placeholder: 'Senha',
    icon: ROUTERS_ICONS_MAP.lock,
  };

  inputPasswordCheck = {
    type: 'password',
    id: 'passwordCheck',
    name: 'passwordCheck',
    placeholder: 'Repetir Senha',
    icon: ROUTERS_ICONS_MAP.lock,
  };

  inputCode = {
    type: 'text',
    id: 'code',
    name: 'code',
    placeholder: 'Código de verificação',
    icon: ROUTERS_ICONS_MAP.lock,
  };

  private readonly _router = inject(Router);
  private readonly _employeesService = inject(EmployeesService);
  private readonly _fb = inject(FormBuilder);

  private passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  constructor() {
    this.resetPasswordForm = this._fb.group({
      newPassword: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      passwordCheck: ['', Validators.required],
      code: ['', Validators.required],
    }, { validators: [this.passwordsMatchValidator, this.codeLengthValidator, this.onlyNumbersValidator] }
    );
  }

  passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword')?.value;
    const passwordCheck = control.get('passwordCheck')?.value;
    return newPassword === passwordCheck ? null : { passwordsMatchValidator: true };
  };

  codeLengthValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const code = control.get('code')?.value;
    return code.length === 6 ? null : { codeValidator: true };
  }

  onlyNumbersValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const code = control.get('code')?.value;
    const isValid = /^[0-9]+$/.test(code);
    return isValid ? null : { onlyNumbersValidator: true };
  }

  token: string | null = null;
  ngOnInit() {
    this.token = localStorage.getItem('resetPasswordToken');
    if (!this.token) {
      this._router.navigate(['/recover-password']);
    }
  }

  onBlurInputNewPassword(value: string) {
    this.resetPasswordForm.patchValue({ newPassword: value });
  }

  onBlurInputPasswordCheck(value: string) {
    this.resetPasswordForm.patchValue({ passwordCheck: value });
  }

  onBlurInputCode(value: string) {
    this.resetPasswordForm.patchValue({ code: value });
  }

  resetPassword() {
    const { newPassword, passwordCheck, code } = this.resetPasswordForm.value;
    console.log(this.resetPasswordForm.valid)
    if (this.resetPasswordForm.valid) {
      this._employeesService.resetPasswordEmployee(
        newPassword, passwordCheck, code, this.token!
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
}
