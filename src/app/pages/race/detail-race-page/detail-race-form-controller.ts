import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IRace } from "../../../interfaces/race/race.interface";

export class DetailRacesFormController {
  detailRacesForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm()
  }

  fulfillDetailRaceForm(raceDetail: IRace) {
    this.detailRacesForm.reset();

    this.detailRacesForm.patchValue({
      nameRace: raceDetail.nameRace,
    })
  }

  createForm() {
    this.detailRacesForm = this._fb.group({
      nameRace: ['', Validators.required],
    })
  }
}
