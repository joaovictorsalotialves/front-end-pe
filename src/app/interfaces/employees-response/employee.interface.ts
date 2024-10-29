import { IAddress } from "../address/address.interface";

export interface IEmployee {
  idEmployee: number,
  nameEmployee: string,
  cellPhoneNumber: string,
  email: string,
  passwordHash?: string | null,
  validationToken?: string | null,
  code?: string | null,
  position: string,
  Addresses_idAddress?: number | null,
  address?: IAddress
}
