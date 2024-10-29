import { StatesList } from "../../types/states-list";
import { IBaseResponse } from "../base-response.interface";

export interface IStatesResponse extends IBaseResponse {
  values?: StatesList,
}
