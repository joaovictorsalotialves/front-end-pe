import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAnimal } from '../../../interfaces/animals/animal.interface';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { AnimalsService } from '../../../services/animals.service';
import { ClinicalReportService } from '../../../services/clinical-report.service';
import { RegistrationClinicalReportFormController } from './registration-clinical-report-form-controller';

@Component({
  selector: 'app-registration-clinical-report-page',
  templateUrl: './registration-clinical-report-page.component.html',
  styleUrl: './registration-clinical-report-page.component.scss'
})
export class RegistrationClinicalReportPageComponent extends RegistrationClinicalReportFormController {
  userLogged = {} as IEmployee;
  submitted = false;

  animalDetail = {} as IAnimal;
  animalId: string | null = null;

  private readonly _routerGet = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _animalsService = inject(AnimalsService);
  private readonly _clinicalReportsServices = inject(ClinicalReportService);

  ngOnInit() {
    this.animalId = this._routerGet.snapshot.paramMap.get('idAnimal');
  }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.getAnimalDetail();
  }

  getAnimalDetail() {
    if (this.animalId && !isNaN(Number(this.animalId))) {
      this._animalsService.getAnimal(Number(this.animalId)).pipe().subscribe({
        next: (animal) => {
          this.animalDetail = animal as IAnimal;
          this.fulfillDetailClinicalReportForm(this.animalDetail, this.userLogged);
        },
        error: (error) => {
          alert(error);
          this._router.navigate([`/animals/detail/${this.animalId}`]);
        },
      });
    } else {
      alert('Erro ao tentar cadastrar relatorio médico');
      this._router.navigate([`/animals/detail/${this.animalId}`]);
    }
  }

  updateFormField(field: string, value: string) {
    this.registrationClinicalReportForm.patchValue({ [field]: value });
  }

  save() {
    this.submitted = true;
    if (this.registrationClinicalReportForm.invalid) {
      alert('Erro ao enviar formulário de cadastro de relatorio médico!');
      return;
    }
    this.registrationClinicalReportForm.get('idAnimal')?.enable();
    this.registrationClinicalReportForm.get('idEmployee')?.enable();
    this._clinicalReportsServices.postClinicalReport({
      descriptionClinicalReport: this.registrationClinicalReportForm.value.descriptionClinicalReport,
      idAnimal: this.registrationClinicalReportForm.value.idAnimal,
      idEmployee: this.registrationClinicalReportForm.value.idEmployee,
    }).pipe().subscribe({
      next: (response) => {
        this.registrationClinicalReportForm.get('idAnimal')?.disable();
        this.registrationClinicalReportForm.get('idEmployee')?.disable();
        alert('Relatorio Médico cadastrada com sucesso!');
        this._router.navigate([`/animals/detail/${this.animalId}`]);
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
