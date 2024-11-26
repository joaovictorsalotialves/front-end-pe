import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IEmployee } from "../../../interfaces/employees/employee.interface";
import { DynamicValidationManager } from "../../../utils/dynamic-validation-manager";

export class ProfileFormController {
  profileForm!: FormGroup;
  validationManager!: DynamicValidationManager;

  private readonly _fb = inject(FormBuilder);

  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private cellPhonePattern = /^(\d{2})9?\d{8}$/;

  constructor() {
    this.createForm();
    this.setupValidationManager();
  }

  get personal_information(): FormGroup {
    return this.profileForm.get(['personal_information']) as FormGroup;
  }

  get address_information(): FormGroup {
    return this.profileForm.get(['address_information']) as FormGroup;
  }

  fulfillProfileForm(userLogged: IEmployee) {
    this.profileForm.reset();

    this.personal_information.patchValue({
      nameEmployee: userLogged.nameEmployee,
      email: userLogged.email,
      cellPhoneNumber: userLogged.cellPhoneNumber,
      position: userLogged.position,
    });

    this.address_information.patchValue({
      publicPlace: userLogged.address?.publicPlace,
      neighborhood: userLogged.address?.neighborhood,
      number: userLogged.address?.number,
      complement: userLogged.address?.complement,
      nameState: userLogged.address?.nameState,
      idState: userLogged.address?.idState,
      nameCity: userLogged.address?.nameCity,
      idCity: userLogged.address?.idCity,
    });
  }

  private createForm() {
    this.profileForm = this._fb.group({
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
    this.profileForm.get('position')?.disable();
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
