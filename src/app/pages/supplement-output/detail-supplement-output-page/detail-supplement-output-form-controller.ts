import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ISupplementOutput } from "../../../interfaces/supplement-outputs/supplement-output.interface";

export class DetailSupplementOutputFormController {
  detailSupplementOutputForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm();
  }

  fulfillDetailSupplementOutputForm(supplementOutputDetail: ISupplementOutput) {
    this.detailSupplementOutputForm.reset();
    let formattedOutputDate = new Date(supplementOutputDetail.outputDate as string).toISOString().split('T')[0];

    console.log(supplementOutputDetail.idSupplement)

    this.detailSupplementOutputForm.patchValue({
      description: supplementOutputDetail.description,
      amount: supplementOutputDetail.amount,
      outputDate: formattedOutputDate,
      idSupplement: supplementOutputDetail.idSupplement,
      nameSupplement: supplementOutputDetail.nameSupplement + ' - ' + supplementOutputDetail.typeMensure,
    })

    console.log(this.detailSupplementOutputForm.value.idSupplement)
  }

  createForm() {
    this.detailSupplementOutputForm = this._fb.group({
      description: [''],
      amount: [null, Validators.required],
      outputDate: [''],
      idSupplement: [null, Validators.required],
      nameSupplement: ['', Validators.required],
    });
    this.detailSupplementOutputForm.get('outputDate')?.disable();
  }
}
