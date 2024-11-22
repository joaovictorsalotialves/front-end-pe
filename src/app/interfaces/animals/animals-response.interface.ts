import { AnimalsList } from "../../types/animals-list";
import { IBaseResponse } from "../base-response.interface";
import { IAnimal } from "./animal.interface";

export interface IAnimalsResponse extends IBaseResponse {
  values?: AnimalsList | IAnimal;
}
