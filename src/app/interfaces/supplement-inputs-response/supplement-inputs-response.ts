import { SupplementInputsList } from "../../types/supplement-inputs-list";
import { IBaseResponse } from "../base-response.interface";

export interface ISupplementInputsResponse extends IBaseResponse {
  values?: SupplementInputsList,
}
