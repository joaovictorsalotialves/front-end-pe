import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { RacesService } from '../../../services/races.service';
import { RegistrationRacesFormController } from '../registration-race-page/registration-race-form-controller';

@Component({
  selector: 'app-registration-race-page',
  templateUrl: './registration-race-page.component.html',
  styleUrl: './registration-race-page.component.scss'
})
export class RegistrationRacePageComponent extends RegistrationRacesFormController {
  userLogged = {} as IEmployee;
  submitted = false;

  private readonly _router = inject(Router);
  private readonly _racesService = inject(RacesService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
  }

  updateFormField(field: string, value: string) {
    this.registrationRacesForm.patchValue({ [field]: value });
  }

  save() {
    this.submitted = true;
    if (this.registrationRacesForm.invalid) {
      alert('Erro ao enviar formulário de cadastro de raça!');
      return;
    }
    this._racesService.postRace({
      nameRace: this.registrationRacesForm.value.nameRace,
    }).pipe().subscribe({
      next: (response) => {
        alert('Raça cadastrada com sucesso!');
        this._router.navigate(['/home'])
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
