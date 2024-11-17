import { RacesList } from "../../types/races-list";
import { IBaseResponse } from "../base-response.interface";
import { IRace } from "./race.interface";

export interface IRacesResponse extends IBaseResponse {
  values?: RacesList | IRace;
}
