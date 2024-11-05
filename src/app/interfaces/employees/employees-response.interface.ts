import { EmployeesList } from "../../types/employees-list";
import { IBaseResponse } from "../base-response.interface";

export interface IEmployeeResponse extends IBaseResponse {
  values?: EmployeesList;
}
