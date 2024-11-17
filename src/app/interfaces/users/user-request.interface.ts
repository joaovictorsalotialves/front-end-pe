import { IAddressRequest } from "../address/address-request.interface";

export interface IUserRequest {
  nameUser: string,
  cellPhoneNumber: string,
  email?: string,
  address?: IAddressRequest
}
