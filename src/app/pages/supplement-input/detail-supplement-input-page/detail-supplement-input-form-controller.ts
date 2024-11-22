import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class DetailSupplementInputFormController {
  detailSupplementInputForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm();
  }

  createForm() {
    this.detailSupplementInputForm = this._fb.group({
      description: [''],
      amount: ['', Validators.required],
      inputDate: [''],
      idSupplement: ['', Validators.required],
      nameSupplement: ['', Validators.required],
    });
    this.detailSupplementInputForm.get('inputDate')?.disable();
  }
}
