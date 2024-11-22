import { SupplementsList } from "../../types/supplements-list";
import { IBaseResponse } from "../base-response.interface";
import { ISupplement } from "./supplement.interface";

export interface ISupplementsResponse extends IBaseResponse {
  values?: SupplementsList | ISupplement;
}
