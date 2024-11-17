import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IEmployee } from "../../../interfaces/employees/employee.interface";

export class DetailEmployeeFormController {
  detailEmployeeForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private cellPhonePattern = /^(0[1-9]{2})[1-9][0-9]{7,8}$/;

  constructor() {
    this.createForm()
  }

  fulfillDetailEmployeeForm(employeeDetail: IEmployee) {
    this.detailEmployeeForm.reset();

    this.detailEmployeeForm.patchValue({
      nameEmployee: employeeDetail.nameEmployee,
      email: employeeDetail.email,
      cellPhoneNumber: employeeDetail.cellPhoneNumber,
      publicPlace: employeeDetail.address?.publicPlace,
      neighborhood: employeeDetail.address?.neighborhood,
      number: employeeDetail.address?.number,
      complement: employeeDetail.address?.complement,
      nameState: employeeDetail.address?.nameState,
      idState: employeeDetail.address?.idState,
      nameCity: employeeDetail.address?.nameCity,
      idCity: employeeDetail.address?.idCity,
      position: employeeDetail.position,
    });
  }

  private createForm() {
    this.detailEmployeeForm = this._fb.group({
      nameEmployee: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      cellPhoneNumber: ['', [Validators.required, Validators.pattern(this.cellPhonePattern)]],
      publicPlace: ['', Validators.required],
      neighborhood: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      nameState: ['', Validators.required],
      idState: [null],
      nameCity: ['', Validators.required],
      idCity: [null],
      position: ['', Validators.required],
    });
  }
}
