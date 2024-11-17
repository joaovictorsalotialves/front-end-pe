import { SpeciesList } from "../../types/species-list";
import { IBaseResponse } from "../base-response.interface";
import { ISpecies } from "./species.interface";

export interface ISpeciesResponse extends IBaseResponse {
  values?: SpeciesList | ISpecies;
}
