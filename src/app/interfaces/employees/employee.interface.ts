import { IAddress } from "../address/address.interface";

export interface IEmployee {
  idEmployee: number,
  nameEmployee: string,
  email: string,
  cellPhoneNumber: string | null,
  passwordHash?: string,
  validationToken?: string | null,
  code?: string | null,
  position: string | null,
  Addresses_idAddress: number | null,
  address?: IAddress
}
