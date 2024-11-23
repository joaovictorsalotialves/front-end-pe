import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ISupplement } from "../../../interfaces/supplements/supplement.interface";

export class DetailSupplementFormController {
  detailSupplementForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm();
  }

  fulfillDetailSupplementForm(supplementDetail: ISupplement) {
    this.detailSupplementForm.reset();

    this.detailSupplementForm.patchValue({
      nameSupplement: supplementDetail.nameSupplement,
      stock: supplementDetail.stock,
      typeMensure: supplementDetail.typeMensure,
      idSupplementCategory: supplementDetail.idSupplementCategory,
      nameSupplementCategory: supplementDetail.nameSupplementCategory,
    });
  }

  createForm() {
    this.detailSupplementForm = this._fb.group({
      nameSupplement: ['', Validators.required],
      stock: [''],
      typeMensure: ['', Validators.required],
      idSupplementCategory: ['', Validators.required],
      nameSupplementCategory: ['', Validators.required],
    });
  }
}
