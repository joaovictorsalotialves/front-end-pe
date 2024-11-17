import { EmployeesList } from "../../types/employees-list";
import { IBaseResponse } from "../base-response.interface";
import { IEmployee } from "./employee.interface";

export interface IEmployeeResponse extends IBaseResponse {
  values?: EmployeesList | IEmployee;
}
