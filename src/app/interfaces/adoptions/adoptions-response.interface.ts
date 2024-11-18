import { AdoptionsList } from "../../types/adoptions-list";
import { IBaseResponse } from "../base-response.interface";
import { IAdoption } from "./adoption.interface";

export interface IAdoptionsResponse extends IBaseResponse {
  values?: AdoptionsList | IAdoption;
}
