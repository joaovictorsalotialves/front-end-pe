import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ISupplementInput } from "../../../interfaces/supplement-inputs/supplement-input.interface";

export class DetailSupplementInputFormController {
  detailSupplementInputForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm();
  }

  fulfillDetailSupplementInputForm(supplementInputDetail: ISupplementInput) {
    this.detailSupplementInputForm.reset();
    let formattedInputDate = new Date(supplementInputDetail.inputDate as string).toISOString().split('T')[0];

    this.detailSupplementInputForm.patchValue({
      description: supplementInputDetail.description,
      amount: supplementInputDetail.amount,
      inputDate: formattedInputDate,
      idSupplement: supplementInputDetail.idSupplement,
      nameSupplement: supplementInputDetail.nameSupplement + ' - ' + supplementInputDetail.typeMensure,
    })
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
