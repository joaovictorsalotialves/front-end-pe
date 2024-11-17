import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { IDonationCategoryRequest } from '../interfaces/donation-category/donation-category-request.interface';
import { IDonationCategoryResponse } from '../interfaces/donation-category/donation-category-response.interface';
import { DonationCategoryList } from '../types/donation-category-list';
import { API_URL } from '../utils/api-url';
import { handleError } from '../utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class DonationCategoriesService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }
  authToken: string = localStorage.getItem('authToken') as string;

  getDonationCategories(nameDonationCategory: string | undefined = undefined): Observable<DonationCategoryList | undefined> {
    let url = API_URL + 'donation-category';
    if (nameDonationCategory) url += '?nameDonationCategory=' + nameDonationCategory;
    return this._httpClient.get<IDonationCategoryResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((donationCategoriesResponse) => donationCategoriesResponse.values),
      catchError(handleError)
    );
  }

  getDonationCategory(idDonationCategory: number): Observable<DonationCategoryList | undefined> {
    let url = API_URL + 'donation-category/' + idDonationCategory;
    return this._httpClient.get<IDonationCategoryResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((donationCategoriesResponse) => donationCategoriesResponse.values),
      catchError(handleError)
    );
  }

  postDonationCategory(objDonationCategory: IDonationCategoryRequest): Observable<IDonationCategoryResponse> {
    let url = API_URL + 'donation-category/';
    return this._httpClient.post<IDonationCategoryResponse>(url, objDonationCategory, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((donationCategoriesResponse) => donationCategoriesResponse),
      catchError(handleError)
    );
  }

  putDonationCategory(idDonationCategory: number, objDonationCategory: IDonationCategoryRequest): Observable<IDonationCategoryResponse> {
    let url = API_URL + 'donation-category/' + idDonationCategory;
    return this._httpClient.put<IDonationCategoryResponse>(url, objDonationCategory, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((donationCategoriesResponse) => donationCategoriesResponse),
      catchError(handleError)
    );
  }

  deleteDonationCategory(idDonationCategory: number): Observable<IDonationCategoryResponse> {
    let url = API_URL + 'donation-category/' + idDonationCategory;
    return this._httpClient.delete<IDonationCategoryResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((donationCategoriesResponse) => donationCategoriesResponse),
      catchError(handleError)
    );
  }
}
