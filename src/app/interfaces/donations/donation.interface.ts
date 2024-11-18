export interface IDonation {
  idDonation: number;
  valueDonation: number | null;
  description: string | null;
  donationDate: string;
  idUser: number | null;
  nameUser: string | null;
  idDonationCategory: number;
  nameDonationCategory: string;
  idSupplement: number | null;
  nameSupplement: string | null;
  amount: number | null;
  descriptionSupplementInput: string | null;
}
