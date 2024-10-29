import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IDonationCategoryResponse } from '../interfaces/donation-category-response/donation-category-response.interface';
import { IDonationCategory } from '../interfaces/donation-category-response/donation-category.interface';
import { DonationCategoryList } from '../types/donation-category-list';
import { API_URL } from '../utils/api-url';

@Injectable({
  providedIn: 'root'
})
export class DonationCategoriesService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  getDonationCategories(nameDonationCategory: string | undefined = undefined): Observable<DonationCategoryList | undefined> {
    let url = API_URL + 'donation-category';
    if (nameDonationCategory) url += '?nameDonationCategory=' + nameDonationCategory;
    return this._httpClient.get<IDonationCategoryResponse>(url).pipe(
      map((donationCategoriesResponse) => donationCategoriesResponse.values)
    );
  }

  getDonationCategory(idDonationCategory: number): Observable<DonationCategoryList | undefined> {
    let url = API_URL + 'donation-category/' + idDonationCategory;
    return this._httpClient.get<IDonationCategoryResponse>(url).pipe(
      map((donationCategoriesResponse) => donationCategoriesResponse.values)
    );
  }

  postDonationCategory(objDonationCategory: IDonationCategory): Observable<IDonationCategoryResponse> {
    let url = API_URL + 'donation-category/';
    return this._httpClient.post<IDonationCategoryResponse>(url, objDonationCategory).pipe(
      map((donationCategoriesResponse) => donationCategoriesResponse)
    );
  }

  putDonationCategory(idDonationCategory: number, objDonationCategory: IDonationCategory): Observable<IDonationCategoryResponse> {
    let url = API_URL + 'donation-category/' + idDonationCategory;
    return this._httpClient.put<IDonationCategoryResponse>(url, objDonationCategory).pipe(
      map((donationCategoriesResponse) => donationCategoriesResponse)
    );
  }

  deleteDonationCategory(idDonationCategory: number): Observable<IDonationCategoryResponse> {
    let url = API_URL + 'donation-category/' + idDonationCategory;
    return this._httpClient.delete<IDonationCategoryResponse>(url).pipe(
      map((donationCategoriesResponse) => donationCategoriesResponse)
    );
  }
}
