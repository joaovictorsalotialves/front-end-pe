import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class DetailSupplementOutputFormController {
  detailSupplementOutputForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm();
  }

  createForm() {
    this.detailSupplementOutputForm = this._fb.group({
      description: [''],
      amount: ['', Validators.required],
      outputDate: [''],
      idSupplement: ['', Validators.required],
      nameSupplement: ['', Validators.required],
    });
    this.detailSupplementOutputForm.get('outputDate')?.disable();
  }
}
