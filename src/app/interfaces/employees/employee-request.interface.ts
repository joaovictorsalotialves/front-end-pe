import { IAddressRequest } from "../address/address-request.interface";

export interface IEmployeeRequest {
  nameEmployee: string;
  email: string;
  cellPhoneNumber?: string | null;
  password?: string;
  passwordCheck?: string;
  position: string | null;
  address?: IAddressRequest;
}
