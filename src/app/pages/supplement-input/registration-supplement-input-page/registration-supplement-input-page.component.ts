import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { SupplementInputsService } from '../../../services/supplement-inputs.service';
import { SupplementsService } from '../../../services/supplements.service';
import { RegistrationSupplementInputFormController } from './registration-supplement-input-form-controller';

@Component({
  selector: 'app-registration-supplement-input-page',
  templateUrl: './registration-supplement-input-page.component.html',
  styleUrl: './registration-supplement-input-page.component.scss'
})
export class RegistrationSupplementInputPageComponent extends RegistrationSupplementInputFormController {
  userLogged = {} as IEmployee;
  submitted = false;

  supplementList: { id: number; value: string; }[] = [];

  private readonly _router = inject(Router);
  private readonly _supplementsServices = inject(SupplementsService);
  private readonly _supplementInputsServices = inject(SupplementInputsService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterSupplementList();
  }

  updateFormField(field: string, value: string) {
    this.registrationSupplementInputForm.patchValue({ [field]: value });
  }

  filterSupplementList(nameSupplement: string | undefined = undefined) {
    this.registrationSupplementInputForm.get('idSupplement')?.reset('');

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
    this.registrationSupplementInputForm.patchValue({ 'nameSupplement': event.value });
    this.registrationSupplementInputForm.patchValue({ 'idSupplement': event.id });
  }

  save() {
    this.submitted = true;
    if (this.registrationSupplementInputForm.invalid) {
      alert('Erro ao enviar formulário de cadastro de entrada de insumo!');
      return;
    }

    this._supplementInputsServices.postSupplementInput({
      description: this.registrationSupplementInputForm.value.description,
      amount: Number(this.registrationSupplementInputForm.value.amount),
      idSupplement: this.registrationSupplementInputForm.value.idSupplement,
    }).pipe().subscribe({
      next: (response) => {
        alert('Entrada de insumo cadastrada com sucesso!');
        this._router.navigate(['/home'])
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
