export interface IClinicalReport {
  idClinicalReport: number;
  registrationDate: string;
  editionDate?: string | null;
  descriptionClinicalReport: string;
  idEmployee: number;
  nameEmployee: string;
  idAnimal: number;
  nameAnimal: string;
  idSpecies: number;
  nameSpecies: string;
  idRace: number;
  nameRace: string;
}
