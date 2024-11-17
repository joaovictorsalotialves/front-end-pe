import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ISpecies } from "../../../interfaces/species/species.interface";

export class DetailSpeciesFormController {
  detailSpeciesForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm()
  }

  fulfillDetailSpeciesForm(speciesDetail: ISpecies) {
    this.detailSpeciesForm.reset();

    this.detailSpeciesForm.patchValue({
      nameSpecies: speciesDetail.nameSpecies,
    })
  }

  createForm() {
    this.detailSpeciesForm = this._fb.group({
      nameSpecies: ['', Validators.required],
    })
  }
}
