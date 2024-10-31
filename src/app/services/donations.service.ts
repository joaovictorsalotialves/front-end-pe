import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IDonation } from '../interfaces/donations-response/donation.interface';
import { IDonationsResponse } from '../interfaces/donations-response/donations-response.interface';
import { DonationsList } from '../types/donations-list';
import { API_URL } from '../utils/api-url';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  getDonations(
    donationDate: string | undefined = undefined, nameDonation: string | undefined = undefined
  ): Observable<DonationsList | undefined> {
    let url = API_URL + 'donation';
    if (donationDate) {
      url += '?donationDate=' + donationDate;
      if (nameDonation) url += '?nameDonation=' + nameDonation;

    } else if (nameDonation) url += '?nameDonation=' + nameDonation;
    return this._httpClient.get<IDonationsResponse>(url).pipe(
      map((donationsResponse) => donationsResponse.values)
    );
  }

  getDonation(idDonation: number): Observable<DonationsList | undefined> {
    let url = API_URL + 'donation/' + idDonation;
    return this._httpClient.get<IDonationsResponse>(url).pipe(
      map((donationsResponse) => donationsResponse.values)
    );
  }

  postDonation(objDonation: IDonation): Observable<IDonationsResponse> {
    let url = API_URL + 'donation/';
    return this._httpClient.post<IDonationsResponse>(url, objDonation).pipe(
      map((donationsResponse) => donationsResponse)
    );
  }

  putDonation(idDonation: number, objDonation: IDonation): Observable<IDonationsResponse> {
    let url = API_URL + 'donation/' + idDonation;
    return this._httpClient.put<IDonationsResponse>(url, objDonation).pipe(
      map((donationsResponse) => donationsResponse)
    );
  }

  deleteDonation(idDonation: number): Observable<IDonationsResponse> {
    let url = API_URL + 'donation/' + idDonation;
    return this._httpClient.delete<IDonationsResponse>(url).pipe(
      map((donationsResponse) => donationsResponse)
    );
  }
}
