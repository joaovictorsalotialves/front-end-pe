import { SupplementOutputsList } from "../../types/supplement-outputs-list";
import { IBaseResponse } from "../base-response.interface";

export interface ISupplementOutputsResponse extends IBaseResponse {
  values?: SupplementOutputsList,
}
