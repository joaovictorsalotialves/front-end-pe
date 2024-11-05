export interface IClinicalReport {
  idClinicalReport?: number,
  registrationDate?: string,
  editionDate?: string | null,
  descriptionClinicalReport?: string,
  idEmployee?: number,
  nameEmployee?: string,
  idAnimal?: number,
  nameAnimal?: string,
  Species_idSpecies?: number,
  Races_idRace?: number
}
