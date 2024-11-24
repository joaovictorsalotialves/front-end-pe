import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { ISupplementInput } from '../../../interfaces/supplement-inputs/supplement-input.interface';
import { SupplementInputsService } from '../../../services/supplement-inputs.service';
import { SupplementsService } from '../../../services/supplements.service';
import { DetailSupplementInputFormController } from './detail-supplement-input-form-controller';

@Component({
  selector: 'app-detail-supplement-input-page',
  templateUrl: './detail-supplement-input-page.component.html',
  styleUrl: './detail-supplement-input-page.component.scss'
})
export class DetailSupplementInputPageComponent extends DetailSupplementInputFormController implements OnInit {
  userLogged = {} as IEmployee;
  submitted = false;

  supplementList: { id: number; value: string; }[] = [];

  supplementInputDetail = {} as ISupplementInput;
  supplementInputId: string | null = null;

  private readonly _routerGet = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _supplementInputsServices = inject(SupplementInputsService);
  private readonly _supplementsServices = inject(SupplementsService);

  ngOnInit() {
    this.supplementInputId = this._routerGet.snapshot.paramMap.get('idSupplementInput');
  }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.getSupplementInputDetail();
  }

  getSupplementInputDetail() {
    if (this.supplementInputId && !isNaN(Number(this.supplementInputId))) {
      this._supplementInputsServices.getSupplementInput(Number(this.supplementInputId)).pipe().subscribe({
        next: (supplementInput) => {
          this.supplementInputDetail = supplementInput as ISupplementInput;
          this.fulfillDetailSupplementInputForm(this.supplementInputDetail);
          this.filterSupplementsList(this.supplementInputDetail.nameSupplementCategory);
        },
        error: (error) => {
          alert(error);
          this._router.navigate(['/supplement-inputs/view']);
        },
      });
    } else {
      alert('Não foi possivel visualizar essa entrada de insumo!');
      this._router.navigate(['/supplement-inputs/view']);
    }
  }

  filterSupplementsList(nameSupplement: string | undefined = undefined) {
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
    this.detailSupplementInputForm.patchValue({ 'nameSupplement': event.value });
    this.detailSupplementInputForm.patchValue({ 'idSupplement': event.id });
  }

  updateFormField(field: string, value: string) {
    this.detailSupplementInputForm.patchValue({ [field]: value });
  }

  save() {
    this.submitted = true;
    if (this.detailSupplementInputForm.invalid) {
      alert('Erro ao enviar formulário de edição de entrada de insumo!');
      return;
    }

    this._supplementInputsServices.putSupplementInput(this.supplementInputDetail.idSupplementInput, {
      description: this.detailSupplementInputForm.value.description,
      amount: Number(this.detailSupplementInputForm.value.amount),
      idSupplement: this.detailSupplementInputForm.value.idSupplement,
    }).pipe().subscribe({
      next: (response) => {
        alert('Entrada de insumo atualizada com sucesso!');
        this._router.navigate(['/supplement-inputs/view'])
      },
      error: (error) => {
        alert(error);
      }
    })
  }

  del() {
    this._supplementInputsServices.deleteSupplementInput(Number(this.supplementInputId)).pipe().subscribe({
      next: (response) => {
        alert('Entrada de insumo deletada com sucesso!');
        this._router.navigate(['/supplement-inputs/view']);
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
