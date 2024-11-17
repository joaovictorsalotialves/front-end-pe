import { inject } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export class UpdatePasswordFormController {
  updatePasswordForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  private passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\#])[A-Za-z\d@$!%*?&\#]{8,}$/;

  constructor() {
    this.createForm()
  }

  private createForm() {
    this.updatePasswordForm = this._fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      passwordCheck: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    }, { validators: [this.passwordsMatchValidator] })
  }

  passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword')?.value;
    const passwordCheck = control.get('passwordCheck')?.value;
    return newPassword === passwordCheck ? null : { passwordsMatchValidator: true };
  };
}
