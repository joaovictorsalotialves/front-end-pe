import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { IDonationRequest } from '../interfaces/donations/donation-request.interface';
import { IDonation } from '../interfaces/donations/donation.interface';
import { IDonationsResponse } from '../interfaces/donations/donations-response.interface';
import { DonationsList } from '../types/donations-list';
import { API_URL } from '../utils/api-url';
import { handleError } from '../utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }
  authToken: string = localStorage.getItem('authToken') as string;

  getDonations(
    nameUser: string | undefined = undefined, donationDate: string | undefined = undefined
  ): Observable<DonationsList | undefined> {
    let url = API_URL + 'donation';
    if (donationDate) {
      url += '?donationDate=' + donationDate;
      if (nameUser) url += '&nameUser=' + nameUser;
    } else if (nameUser) url += '?nameUser=' + nameUser;
    return this._httpClient.get<IDonationsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((donationsResponse) => donationsResponse.values as DonationsList),
      catchError(handleError)
    );
  }

  getDonation(idDonation: number): Observable<IDonation | undefined> {
    let url = API_URL + 'donation/' + idDonation;
    return this._httpClient.get<IDonationsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((donationsResponse) => donationsResponse.values as IDonation
      ),
      catchError(handleError)
    );
  }

  postDonation(objDonation: IDonationRequest): Observable<IDonationsResponse> {
    let url = API_URL + 'donation/';
    return this._httpClient.post<IDonationsResponse>(url, objDonation, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((donationsResponse) => donationsResponse),
      catchError(handleError)
    );
  }

  putDonation(idDonation: number, objDonation: IDonationRequest): Observable<IDonationsResponse> {
    let url = API_URL + 'donation/' + idDonation;
    return this._httpClient.put<IDonationsResponse>(url, objDonation, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((donationsResponse) => donationsResponse),
      catchError(handleError)
    );
  }

  deleteDonation(idDonation: number): Observable<IDonationsResponse> {
    let url = API_URL + 'donation/' + idDonation;
    return this._httpClient.delete<IDonationsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((donationsResponse) => donationsResponse),
      catchError(handleError)
    );
  }
}
