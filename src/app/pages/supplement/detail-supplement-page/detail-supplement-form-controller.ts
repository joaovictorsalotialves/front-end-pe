import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class DetailSupplementFormController {
  detailSupplementForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm();
  }

  createForm() {
    this.detailSupplementForm = this._fb.group({
      nameSupplement: ['', Validators.required],
      stock: [''],
      typeMensure: ['', Validators.required],
      idSuppplementCategory: ['', Validators.required],
      nameSuppplementCategory: ['', Validators.required],
    })
  }
}
