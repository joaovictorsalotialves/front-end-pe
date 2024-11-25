import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IAnimal } from "../../../interfaces/animals/animal.interface";
import { IEmployee } from "../../../interfaces/employees/employee.interface";

export class RegistrationClinicalReportFormController {
  registrationClinicalReportForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm();
  }

  fulfillDetailClinicalReportForm(animalDetail: IAnimal, userLogged: IEmployee) {
    this.registrationClinicalReportForm.patchValue({
      idAnimal: animalDetail.idAnimal,
      nameAnimal: animalDetail.nameAnimal,
      idEmployee: userLogged.idEmployee,
      nameEmployee: userLogged.nameEmployee,
    });
  }

  createForm() {
    this.registrationClinicalReportForm = this._fb.group({
      descriptionClinicalReport: ['', Validators.required],
      idEmployee: ['', Validators.required],
      nameEmployee: [null, Validators.required],
      idAnimal: ['', Validators.required],
      nameAnimal: [null, Validators.required],
    });
    this.registrationClinicalReportForm.get('idAnimal')?.disable();
    this.registrationClinicalReportForm.get('nameAnimal')?.disable();
    this.registrationClinicalReportForm.get('idEmployee')?.disable();
    this.registrationClinicalReportForm.get('nameEmployee')?.disable();
  }
}
