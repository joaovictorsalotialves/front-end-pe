import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IEmployee } from "../../../interfaces/employees/employee.interface";
import { DynamicValidationManager } from "../../../utils/dynamic-validation-manager";

export class DetailEmployeeFormController {
  detailEmployeeForm!: FormGroup;
  validationManager!: DynamicValidationManager;

  private readonly _fb = inject(FormBuilder);

  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private cellPhonePattern = /^(0[1-9]{2})[1-9][0-9]{7,8}$/;

  constructor() {
    this.createForm();
    this.setupValidationManager();
  }

  get personal_information(): FormGroup {
    return this.detailEmployeeForm.get(['personal_information']) as FormGroup;
  }

  get address_information(): FormGroup {
    return this.detailEmployeeForm.get(['address_information']) as FormGroup;
  }

  fulfillDetailEmployeeForm(employeeDetail: IEmployee) {
    this.detailEmployeeForm.reset();

    this.personal_information.patchValue({
      nameEmployee: employeeDetail.nameEmployee,
      email: employeeDetail.email,
      cellPhoneNumber: employeeDetail.cellPhoneNumber,
      position: employeeDetail.position,
    });
    this.address_information.patchValue({
      publicPlace: employeeDetail.address?.publicPlace,
      neighborhood: employeeDetail.address?.neighborhood,
      number: employeeDetail.address?.number,
      complement: employeeDetail.address?.complement,
      nameState: employeeDetail.address?.nameState,
      idState: employeeDetail.address?.idState,
      nameCity: employeeDetail.address?.nameCity,
      idCity: employeeDetail.address?.idCity,
    });
  }

  private createForm() {
    this.detailEmployeeForm = this._fb.group({
      personal_information: this._fb.group({
        nameEmployee: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        cellPhoneNumber: ['', [Validators.required, Validators.pattern(this.cellPhonePattern)]],
        position: ['', Validators.required],
      }),
      address_information: this._fb.group({
        publicPlace: [''],
        neighborhood: [''],
        number: [''],
        complement: [''],
        nameState: [''],
        idState: [null],
        nameCity: [''],
        idCity: [null],
      })
    });
  }

  setupValidationManager() {
    this.validationManager = new DynamicValidationManager(this.address_information);
    this.validationManager.setValidationConfig({
      publicPlace: [Validators.required],
      neighborhood: [Validators.required],
      number: [Validators.required],
      idState: [Validators.required],
      nameState: [Validators.required],
      idCity: [Validators.required],
      nameCity: [Validators.required],
    });
  }
}
