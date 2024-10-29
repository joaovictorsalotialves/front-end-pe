import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ISupplementCategoryResponse } from '../interfaces/supplement-category-reponse/supplement-category-response.interface';
import { ISupplementCategory } from '../interfaces/supplement-category-reponse/supplement-category.interface';
import { SupplementCategoryList } from '../types/supplement-category-list';
import { API_URL } from '../utils/api-url';

@Injectable({
  providedIn: 'root'
})
export class SupplementCategoriesService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  getSupplementCategories(nameSupplementCategory: string | undefined = undefined): Observable<SupplementCategoryList | undefined> {
    let url = API_URL + 'supplement-category';
    if (nameSupplementCategory) url += '?nameSupplementCategory=' + nameSupplementCategory;
    return this._httpClient.get<ISupplementCategoryResponse>(url).pipe(
      map((supplementCategoriesResponse) => supplementCategoriesResponse.values)
    );
  }

  getSupplementCategory(idSupplementCategory: number): Observable<SupplementCategoryList | undefined> {
    let url = API_URL + 'supplement-category/' + idSupplementCategory;
    return this._httpClient.get<ISupplementCategoryResponse>(url).pipe(
      map((supplementCategoriesResponse) => supplementCategoriesResponse.values)
    );
  }

  postSupplementCategory(objSupplementCategory: ISupplementCategory): Observable<ISupplementCategoryResponse> {
    let url = API_URL + 'supplement-category/';
    return this._httpClient.post<ISupplementCategoryResponse>(url, objSupplementCategory).pipe(
      map((supplementCategoriesResponse) => supplementCategoriesResponse)
    );
  }

  putSupplementCategory(idSupplementCategory: number, objSupplementCategory: ISupplementCategory): Observable<ISupplementCategoryResponse> {
    let url = API_URL + 'supplement-category/' + idSupplementCategory;
    return this._httpClient.put<ISupplementCategoryResponse>(url, objSupplementCategory).pipe(
      map((supplementCategoriesResponse) => supplementCategoriesResponse)
    );
  }

  deleteSupplementCategory(idSupplementCategory: number): Observable<ISupplementCategoryResponse> {
    let url = API_URL + 'supplement-category/' + idSupplementCategory;
    return this._httpClient.delete<ISupplementCategoryResponse>(url).pipe(
      map((supplementCategoriesResponse) => supplementCategoriesResponse)
    );
  }
}
