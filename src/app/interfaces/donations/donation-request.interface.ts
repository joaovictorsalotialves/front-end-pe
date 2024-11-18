import { ISupplementInputRequest } from "../supplement-inputs/supplement-input-request.interface";

export interface IDonationRequest {
  valueDonation?: number,
  description?: string,
  idUser: number,
  idDonationCategory: number,
  supplementInput?: ISupplementInputRequest;
}
