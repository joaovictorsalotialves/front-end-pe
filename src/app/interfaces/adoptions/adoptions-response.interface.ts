import { AdoptionsList } from "../../types/adoptions-list";
import { IBaseResponse } from "../base-response.interface";

export interface IAdoptionsResponse extends IBaseResponse {
  values?: AdoptionsList;
}
