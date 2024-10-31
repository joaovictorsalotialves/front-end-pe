import { DonationsList } from "../../types/donations-list";
import { IBaseResponse } from "../base-response.interface";

export interface IDonationsResponse extends IBaseResponse {
  values?: DonationsList,
}
