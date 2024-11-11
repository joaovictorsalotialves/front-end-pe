import { IBaseResponse } from "../base-response.interface";
import { IEmployeeRequest } from "./employee-request.interface";

export interface ILoginResponse extends IBaseResponse {
  token?: string;
  user?: IEmployeeRequest;
}
