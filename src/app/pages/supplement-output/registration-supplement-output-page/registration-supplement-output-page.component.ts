import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { SupplementOutputsService } from '../../../services/supplement-outputs.service';
import { SupplementsService } from '../../../services/supplements.service';
import { RegistrationSupplementOutputFormController } from './registration-supplement-output-form-controller';

@Component({
  selector: 'app-registration-supplement-output-page',
  templateUrl: './registration-supplement-output-page.component.html',
  styleUrl: './registration-supplement-output-page.component.scss'
})
export class RegistrationSupplementOutputPageComponent extends RegistrationSupplementOutputFormController {
  userLogged = {} as IEmployee;
  submitted = false;

  supplementList: { id: number; value: string; }[] = [];

  private readonly _router = inject(Router);
  private readonly _supplementsServices = inject(SupplementsService);
  private readonly _supplementOutputsServices = inject(SupplementOutputsService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterSupplementList();
  }

  updateFormField(field: string, value: string) {
    this.registrationSupplementOutputForm.patchValue({ [field]: value });
  }

  filterSupplementList(nameSupplement: string | undefined = undefined) {
    this.registrationSupplementOutputForm.get('idSupplement')?.reset('');

    this._supplementsServices.getSupplements(nameSupplement).pipe().subscribe({
      next: (supplementList) => {
        const transformedSupplementList = supplementList?.map((supplement) => ({
          id: supplement.idSupplement,
          value: supplement.nameSupplement + ' - ' + supplement.typeMensure,
        }))
        this.supplementList = transformedSupplementList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  onSelectSupplement(event: { id: string, value: string }) {
    this.registrationSupplementOutputForm.patchValue({ 'nameSupplement': event.value });
    this.registrationSupplementOutputForm.patchValue({ 'idSupplement': event.id });
  }

  save() {
    this.submitted = true;
    if (this.registrationSupplementOutputForm.invalid) {
      alert('Erro ao enviar formulário de cadastro de saída de insumo!');
      return;
    }

    this._supplementOutputsServices.postSupplementOutput({
      description: this.registrationSupplementOutputForm.value.description,
      amount: Number(this.registrationSupplementOutputForm.value.amount),
      idSupplement: this.registrationSupplementOutputForm.value.idSupplement,
    }).pipe().subscribe({
      next: (response) => {
        alert('Saída de insumo cadastrada com sucesso!');
        this._router.navigate(['/home'])
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
