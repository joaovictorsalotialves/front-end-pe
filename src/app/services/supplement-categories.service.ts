import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { ISupplementCategoryResponse } from '../interfaces/supplement-category/supplement-category-response.interface';
import { ISupplementCategory } from '../interfaces/supplement-category/supplement-category.interface';
import { SupplementCategoryList } from '../types/supplement-category-list';
import { API_URL } from '../utils/api-url';
import { handleError } from '../utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class SupplementCategoriesService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }
  authToken: string = localStorage.getItem('authToken') as string;

  getSupplementCategories(nameSupplementCategory: string | undefined = undefined): Observable<SupplementCategoryList | undefined> {
    let url = API_URL + 'supplement-category';
    if (nameSupplementCategory) url += '?nameSupplementCategory=' + nameSupplementCategory;
    return this._httpClient.get<ISupplementCategoryResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((supplementCategoriesResponse) => supplementCategoriesResponse.values),
      catchError(handleError)
    );
  }

  getSupplementCategory(idSupplementCategory: number): Observable<SupplementCategoryList | undefined> {
    let url = API_URL + 'supplement-category/' + idSupplementCategory;
    return this._httpClient.get<ISupplementCategoryResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((supplementCategoriesResponse) => supplementCategoriesResponse.values),
      catchError(handleError)
    );
  }

  postSupplementCategory(objSupplementCategory: ISupplementCategory): Observable<ISupplementCategoryResponse> {
    let url = API_URL + 'supplement-category/';
    return this._httpClient.post<ISupplementCategoryResponse>(url, objSupplementCategory, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((supplementCategoriesResponse) => supplementCategoriesResponse),
      catchError(handleError)
    );
  }

  putSupplementCategory(idSupplementCategory: number, objSupplementCategory: ISupplementCategory): Observable<ISupplementCategoryResponse> {
    let url = API_URL + 'supplement-category/' + idSupplementCategory;
    return this._httpClient.put<ISupplementCategoryResponse>(url, objSupplementCategory, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((supplementCategoriesResponse) => supplementCategoriesResponse),
      catchError(handleError)
    );
  }

  deleteSupplementCategory(idSupplementCategory: number): Observable<ISupplementCategoryResponse> {
    let url = API_URL + 'supplement-category/' + idSupplementCategory;
    return this._httpClient.delete<ISupplementCategoryResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((supplementCategoriesResponse) => supplementCategoriesResponse),
      catchError(handleError)
    );
  }
}
