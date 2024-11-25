import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IClinicalReport } from "../../../interfaces/clinical-reports-response/clinical-report.interface";

export class DetailClinicalReportFormController {
  detailClinicalReportForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm();
  }

  fulfillDetailClinicalReportForm(clinicalReportDetail: IClinicalReport) {
    this.detailClinicalReportForm.reset();

    this.detailClinicalReportForm.patchValue({
      descriptionClinicalReport: clinicalReportDetail.descriptionClinicalReport,
      idAnimal: clinicalReportDetail.idAnimal,
      nameAnimal: clinicalReportDetail.nameAnimal,
      idEmployee: clinicalReportDetail.idEmployee,
      nameEmployee: clinicalReportDetail.nameEmployee,
    });
  }

  createForm() {
    this.detailClinicalReportForm = this._fb.group({
      descriptionClinicalReport: ['', Validators.required],
      idEmployee: ['', Validators.required],
      nameEmployee: [null, Validators.required],
      idAnimal: ['', Validators.required],
      nameAnimal: [null, Validators.required],
    });
    this.detailClinicalReportForm.get('idAnimal')?.disable();
    this.detailClinicalReportForm.get('nameAnimal')?.disable();
    this.detailClinicalReportForm.get('idEmployee')?.disable();
    this.detailClinicalReportForm.get('nameEmployee')?.disable();
  }
}
