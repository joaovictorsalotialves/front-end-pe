import { CitiesList } from "../../types/cities-list";
import { IBaseResponse } from "../base-response.interface";

export interface ICitiesResponse extends IBaseResponse {
  values?: CitiesList;
}
