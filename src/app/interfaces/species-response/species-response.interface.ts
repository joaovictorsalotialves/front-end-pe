import { SpeciesList } from "../../types/species-list";
import { IBaseResponse } from "../base-response.interface";

export interface ISpeciesResponse extends IBaseResponse {
  values?: SpeciesList,
}
