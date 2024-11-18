import { SupplementInputsList } from "../../types/supplement-inputs-list";
import { IBaseResponse } from "../base-response.interface";
import { ISupplementInput } from "./supplement-input";

export interface ISupplementInputsResponse extends IBaseResponse {
  values?: SupplementInputsList | ISupplementInput;
}
