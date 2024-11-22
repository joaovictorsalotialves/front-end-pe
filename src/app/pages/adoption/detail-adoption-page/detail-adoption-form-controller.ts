import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IAdoption } from "../../../interfaces/adoptions/adoption.interface";

export class DetailAdoptionFormController {
  detailAdoptionForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm();
  }

  fulfillDetailAdoptionForm(adoptionDetail: IAdoption) {
    this.detailAdoptionForm.reset();
    let formattedDateAdoption = new Date(adoptionDetail.dateAdoption as string).toISOString().split('T')[0];

    this.detailAdoptionForm.patchValue({
      idAnimal: adoptionDetail.idAnimal,
      nameAnimal: adoptionDetail.nameAnimal,
      idUser: adoptionDetail.idUser,
      nameUser: adoptionDetail.nameUser,
      statusAdoption: adoptionDetail.statusAdoption,
      dateAdoption: formattedDateAdoption,
    })
  }

  createForm() {
    this.detailAdoptionForm = this._fb.group({
      idAnimal: [null, Validators.required],
      nameAnimal: ['', Validators.required],
      idUser: [null, Validators.required],
      nameUser: ['', Validators.required],
      statusAdoption: ['', Validators.required],
      dateAdoption: [''],
    })

    this.detailAdoptionForm.get('dateAdoption')?.disable();
  }
}
