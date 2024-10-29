import { SupplementsList } from "../../types/supplements-list";
import { IBaseResponse } from "../base-response.interface";

export interface ISupplementsResponse extends IBaseResponse {
  values?: SupplementsList[],
}
