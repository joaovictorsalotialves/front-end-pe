import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { SpeciesService } from '../../../services/especies.service';
import { RegistrationSpeciesFormController } from './registration-species-form-controller';

@Component({
  selector: 'app-registration-species-page',
  templateUrl: './registration-species-page.component.html',
  styleUrl: './registration-species-page.component.scss'
})
export class RegistrationSpeciesPageComponent extends RegistrationSpeciesFormController {
  userLogged = {} as IEmployee;
  submitted = false;

  private readonly _router = inject(Router);
  private readonly _speciesService = inject(SpeciesService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
  }

  updateFormField(field: string, value: string) {
    this.registrationSpeciesForm.patchValue({ [field]: value });
  }

  save() {
    this.submitted = true;
    if (this.registrationSpeciesForm.invalid) {
      alert('Erro ao enviar formulário de cadastro de espécie!');
      return;
    }
    this._speciesService.postSpecies({
      nameSpecies: this.registrationSpeciesForm.value.nameSpecies,
    }).pipe().subscribe({
      next: (response) => {
        alert('Espécie cadastrada com sucesso!');
        this._router.navigate(['/home'])
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
