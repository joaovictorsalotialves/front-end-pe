import { IBaseResponse } from "../base-response.interface";

export interface ILoginResponse extends IBaseResponse {
  token?: string,
}
