export interface IDonation {
  idDonation?: number,
  valueDonation?: number,
  description?: string,
  donationDate?: string,
  idUser?: number,
  nameUser?: string,
  idDonationCategory: number,
  nameDonationCategory?: string,
  nameSupplement?: string,
  amount?: number,
  supplementInput?: {
    descriptionSupplementInput: string,
    amount: number,
    idSupplement: number,
  },
}
