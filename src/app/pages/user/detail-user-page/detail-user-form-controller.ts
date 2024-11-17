import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IUser } from "../../../interfaces/users/user.interface";

export class DetailUserFormController {
  detailUserForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private cellPhonePattern = /^(0[1-9]{2})[1-9][0-9]{7,8}$/;

  constructor() {
    this.createForm()
  }

  fulfillDetailUserForm(userDetail: IUser) {
    this.detailUserForm.reset();

    this.detailUserForm.patchValue({
      nameUser: userDetail.nameUser,
      email: userDetail.email,
      cellPhoneNumber: userDetail.cellPhoneNumber,
      publicPlace: userDetail.address?.publicPlace,
      neighborhood: userDetail.address?.neighborhood,
      number: userDetail.address?.number,
      complement: userDetail.address?.complement,
      nameState: userDetail.address?.nameState,
      idState: userDetail.address?.idState,
      nameCity: userDetail.address?.nameCity,
      idCity: userDetail.address?.idCity,
    });
  }

  private createForm() {
    this.detailUserForm = this._fb.group({
      nameUser: ['', Validators.required],
      email: ['', Validators.pattern(this.emailPattern)],
      cellPhoneNumber: ['', [Validators.required, Validators.pattern(this.cellPhonePattern)]],
      publicPlace: ['', Validators.required],
      neighborhood: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      nameState: ['', Validators.required],
      idState: [null],
      nameCity: ['', Validators.required],
      idCity: [null],
    });
  }
}
