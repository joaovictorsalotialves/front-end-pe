import { RacesList } from "../../types/races-list";
import { IBaseResponse } from "../base-response.interface";

export interface IRacesResponse extends IBaseResponse {
  values?: RacesList,
}
