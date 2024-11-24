import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { ISupplementOutput } from '../../../interfaces/supplement-outputs/supplement-output.interface';
import { SupplementOutputsService } from '../../../services/supplement-outputs.service';
import { SupplementsService } from '../../../services/supplements.service';
import { DetailSupplementOutputFormController } from './detail-supplement-output-form-controller';

@Component({
  selector: 'app-detail-supplement-output-page',
  templateUrl: './detail-supplement-output-page.component.html',
  styleUrl: './detail-supplement-output-page.component.scss'
})
export class DetailSupplementOutputPageComponent extends DetailSupplementOutputFormController implements OnInit {
  userLogged = {} as IEmployee;
  submitted = false;

  supplementList: { id: number; value: string; }[] = [];

  supplementOutputDetail = {} as ISupplementOutput;
  supplementOutputId: string | null = null;

  private readonly _routerGet = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _supplementOutputsServices = inject(SupplementOutputsService);
  private readonly _supplementsServices = inject(SupplementsService);

  ngOnInit() {
    this.supplementOutputId = this._routerGet.snapshot.paramMap.get('idSupplementOutput');
  }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.getSupplementOutputDetail();
  }

  getSupplementOutputDetail() {
    if (this.supplementOutputId && !isNaN(Number(this.supplementOutputId))) {
      this._supplementOutputsServices.getSupplementOutput(Number(this.supplementOutputId)).pipe().subscribe({
        next: (supplementOutput) => {
          this.supplementOutputDetail = supplementOutput as ISupplementOutput;
          this.fulfillDetailSupplementOutputForm(this.supplementOutputDetail);
          this.filterSupplementsList(this.supplementOutputDetail.nameSupplementCategory);
          console.log(this.detailSupplementOutputForm)
        },
        error: (error) => {
          alert(error);
          this._router.navigate(['/supplement-outputs/view']);
        },
      });
    } else {
      alert('Não foi possivel visualizar essa saída de insumo!');
      this._router.navigate(['/supplement-outputs/view']);
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
    this.detailSupplementOutputForm.patchValue({ 'nameSupplement': event.value });
    this.detailSupplementOutputForm.patchValue({ 'idSupplement': event.id });
  }

  updateFormField(field: string, value: string) {
    this.detailSupplementOutputForm.patchValue({ [field]: value });
  }

  save() {
    this.submitted = true;
    if (this.detailSupplementOutputForm.invalid) {
      alert('Erro ao enviar formulário de edição de saída de insumo!');
      return;
    }

    this._supplementOutputsServices.putSupplementOutput(this.supplementOutputDetail.idSupplementOutput, {
      description: this.detailSupplementOutputForm.value.description,
      amount: Number(this.detailSupplementOutputForm.value.amount),
      idSupplement: this.detailSupplementOutputForm.value.idSupplement,
    }).pipe().subscribe({
      next: (response) => {
        alert('Saída de insumo atualizada com sucesso!');
        this._router.navigate(['/supplement-outputs/view'])
      },
      error: (error) => {
        alert(error);
      }
    })
  }

  del() {
    this._supplementOutputsServices.deleteSupplementOutput(Number(this.supplementOutputId)).pipe().subscribe({
      next: (response) => {
        alert('Saída de insumo deletada com sucesso!');
        this._router.navigate(['/supplement-outputs/view']);
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
