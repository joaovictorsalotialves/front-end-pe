import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IEmployee } from "../../interfaces/employees/employee.interface";

export class ProfileFormController {
  profileForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private cellPhonePattern = /^(0[1-9]{2})[1-9][0-9]{7,8}$/;

  constructor() {
    this.createForm()
  }

  fulfillProfileForm(userLogged: IEmployee) {
    this.profileForm.reset();

    this.profileForm.patchValue({
      nameEmployee: userLogged.nameEmployee,
      email: userLogged.email,
      cellPhoneNumber: userLogged.cellPhoneNumber,
      publicPlace: userLogged.address?.publicPlace,
      neighborhood: userLogged.address?.neighborhood,
      number: userLogged.address?.number,
      complement: userLogged.address?.complement,
      nameState: userLogged.address?.nameState,
      idState: userLogged.address?.idState,
      nameCity: userLogged.address?.nameCity,
      idCity: userLogged.address?.idCity,
      position: userLogged.position,
    });

    console.log(this.profileForm);
  }

  private createForm() {
    this.profileForm = this._fb.group({
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
