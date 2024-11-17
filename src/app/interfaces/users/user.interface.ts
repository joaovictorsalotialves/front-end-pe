import { IAddress } from "../address/address.interface"

export interface IUser {
  idUser: number,
  nameUser: string,
  cellPhoneNumber: string,
  email?: string,
  Addresses_idAddress: number | null,
  address?: IAddress
}
