import { DonationsList } from "../../types/donations-list";
import { IBaseResponse } from "../base-response.interface";
import { IDonation } from "./donation.interface";

export interface IDonationsResponse extends IBaseResponse {
  values?: DonationsList | IDonation;
}
