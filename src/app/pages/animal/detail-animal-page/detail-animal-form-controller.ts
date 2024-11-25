import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IAnimal } from "../../../interfaces/animals/animal.interface";

export class DetailAnimalFormController {
  detailAnimalForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.createForm();
  }

  fulfillDetailAnimalForm(animalDetail: IAnimal) {
    this.detailAnimalForm.reset();

    this.detailAnimalForm.patchValue({
      nameAnimal: animalDetail.nameAnimal,
      size: animalDetail.size,
      statusAnimal: animalDetail.statusAnimal,
      description: animalDetail.description,
      idSpecies: animalDetail.idSpecies,
      nameSpecies: animalDetail.nameSpecies,
      idRace: animalDetail.idRace,
      nameRace: animalDetail.nameRace,
    });
  }

  createForm() {
    this.detailAnimalForm = this._fb.group({
      nameAnimal: ['', Validators.required],
      size: ['', Validators.required],
      statusAnimal: ['', Validators.required],
      description: [''],
      idSpecies: [null, Validators.required],
      nameSpecies: ['', Validators.required],
      idRace: [null, Validators.required],
      nameRace: ['', Validators.required],
    });
  }
}
