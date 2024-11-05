export interface IAddressRequest {
  publicPlace: string;
  neighborhood: string;
  number: string;
  complement?: string;
  idState: number;
  idCity: number;
}
