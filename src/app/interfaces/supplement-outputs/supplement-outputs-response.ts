import { SupplementOutputsList } from "../../types/supplement-outputs-list";
import { IBaseResponse } from "../base-response.interface";
import { ISupplementOutput } from "./supplement-output.interface";

export interface ISupplementOutputsResponse extends IBaseResponse {
  values?: SupplementOutputsList | ISupplementOutput;
}
