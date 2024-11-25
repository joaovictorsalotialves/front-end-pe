import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAnimal } from '../../../interfaces/animals/animal.interface';
import { IClinicalReport } from '../../../interfaces/clinical-reports-response/clinical-report.interface';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { AnimalsService } from '../../../services/animals.service';
import { ClinicalReportService } from '../../../services/clinical-report.service';
import { DetailClinicalReportFormController } from './detail-clinical-report-form-controller';

@Component({
  selector: 'app-detail-clinical-report-page',
  templateUrl: './detail-clinical-report-page.component.html',
  styleUrl: './detail-clinical-report-page.component.scss'
})
export class DetailClinicalReportPageComponent extends DetailClinicalReportFormController implements OnInit {
  userLogged = {} as IEmployee;
  submitted = false;

  clinicalReportDetail = {} as IClinicalReport;
  clinicalReportId: string | null = null;

  animalDetail = {} as IAnimal;
  animalId: string | null = null;

  private readonly _routerGet = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _animalsService = inject(AnimalsService);
  private readonly _clinicalReportsServices = inject(ClinicalReportService);

  ngOnInit() {
    this.animalId = this._routerGet.snapshot.paramMap.get('idAnimal');
    this.clinicalReportId = this._routerGet.snapshot.paramMap.get('idClinicalReport');
  }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.getAnimalDetail();
    this.getClinicalReportDetail();
  }

  getAnimalDetail() {
    if (this.animalId && !isNaN(Number(this.animalId))) {
      this._animalsService.getAnimal(Number(this.animalId)).pipe().subscribe({
        next: (animal) => {
          this.animalDetail = animal as IAnimal;
        },
        error: (error) => {
          alert(error);
          this._router.navigate([`/animals/${this.animalId}/clinical-reports/view`]);
        },
      });
    } else {
      alert('Não foi possivel visualizar esse relátorio');
      this._router.navigate(['/animals/view']);
    }
  }

  getClinicalReportDetail() {
    if (this.clinicalReportId && !isNaN(Number(this.clinicalReportId))) {
      this._clinicalReportsServices.getClinicalReport(Number(this.clinicalReportId)).pipe().subscribe({
        next: (clinicalReport) => {
          this.clinicalReportDetail = clinicalReport as IClinicalReport;
          this.fulfillDetailClinicalReportForm(this.clinicalReportDetail);
        },
        error: (error) => {
          alert(error);
          this._router.navigate([`/animals/${this.animalId}/clinical-reports/view`]);
        },
      });
    } else {
      alert('Não foi possivel visualizar esse relátorio');
      this._router.navigate([`/animals/${this.animalId}/clinical-reports/view`]);
    }
  }

  updateFormField(field: string, value: string) {
    this.detailClinicalReportForm.patchValue({ [field]: value });
  }

  save() {
    this.submitted = true;
    if (this.detailClinicalReportForm.invalid) {
      alert('Erro ao enviar formulário de edição de relatorio médico!');
      return;
    }
    this.detailClinicalReportForm.get('idAnimal')?.enable();
    this.detailClinicalReportForm.get('idEmployee')?.enable();
    this._clinicalReportsServices.putClinicalReport(this.clinicalReportDetail.idClinicalReport, {
      descriptionClinicalReport: this.detailClinicalReportForm.value.descriptionClinicalReport,
      idAnimal: this.detailClinicalReportForm.value.idAnimal,
      idEmployee: this.detailClinicalReportForm.value.idEmployee,
    }).pipe().subscribe({
      next: (response) => {
        this.detailClinicalReportForm.get('idAnimal')?.disable();
        this.detailClinicalReportForm.get('idEmployee')?.disable();
        alert('Relatorio Médico atualizado com sucesso!');
        this._router.navigate([`/animals/${this.animalId}/clinical-reports/view`]);
      },
      error: (error) => {
        alert(error);
      }
    })
  }

  del() {
    this._clinicalReportsServices.deleteClinicalReport(Number(this.clinicalReportId)).pipe().subscribe({
      next: (response) => {
        alert('Relatorio médico deletado com sucesso!');
        this._router.navigate([`/animals/${this.animalId}/clinical-reports/view`]);
      },
      error: (error) => {
        alert(error);
      }
    });
  }
}
