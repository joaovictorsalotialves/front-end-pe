import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IUser } from "../../../interfaces/users/user.interface";
import { DynamicValidationManager } from "../../../utils/dynamic-validation-manager";

export class DetailUserFormController {
  detailUserForm!: FormGroup;
  validationManager!: DynamicValidationManager;

  private readonly _fb = inject(FormBuilder);

  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private cellPhonePattern = /^(\d{2})9?\d{8}$/;

  constructor() {
    this.createForm();
    this.setupValidationManager();
  }

  fulfillDetailUserForm(userDetail: IUser) {
    this.detailUserForm.reset();

    this.personal_information.patchValue({
      nameUser: userDetail.nameUser,
      email: userDetail.email,
      cellPhoneNumber: userDetail.cellPhoneNumber,
    });

    this.address_information.patchValue({
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

  get personal_information(): FormGroup {
    return this.detailUserForm.get(['personal_information']) as FormGroup;
  }

  get address_information(): FormGroup {
    return this.detailUserForm.get(['address_information']) as FormGroup;
  }

  private createForm() {
    this.detailUserForm = this._fb.group({
      personal_information: this._fb.group({
        nameUser: ['', Validators.required],
        email: ['', [Validators.pattern(this.emailPattern)]],
        cellPhoneNumber: ['', [Validators.required, Validators.pattern(this.cellPhonePattern)]],
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
