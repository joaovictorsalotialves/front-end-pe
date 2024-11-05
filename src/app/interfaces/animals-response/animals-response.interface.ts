import { AnimalsList } from "../../types/animals-list";
import { IBaseResponse } from "../base-response.interface";

export interface IAnimalsResponse extends IBaseResponse {
  values?: AnimalsList,
}
