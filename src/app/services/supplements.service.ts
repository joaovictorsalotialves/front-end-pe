import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { ISupplement } from '../interfaces/supplements/supplement.interface';
import { ISupplementsResponse } from '../interfaces/supplements/supplements-response.interface';
import { SupplementsList } from '../types/supplements-list';
import { API_URL } from '../utils/api-url';
import { handleError } from '../utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class SupplementsService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }
  authToken: string = localStorage.getItem('authToken') as string;

  getSupplements(
    nameSupplement: string | null | undefined = undefined, nameSupplementCategory: string | undefined = undefined,
    typeMensure: string | undefined = undefined
  ): Observable<SupplementsList | undefined> {
    let url = API_URL + 'supplement';
    if (nameSupplement) {
      url += '?nameSupplement=' + nameSupplement;
      if (nameSupplementCategory) url += '&nameSupplementCategory' + nameSupplementCategory;
      if (typeMensure) url += '&typeMensure' + typeMensure;
    } else if (nameSupplementCategory) {
      url += '?nameSupplementCategory' + nameSupplementCategory;
      if (typeMensure) url += '&typeMensure' + typeMensure;
    } else if (typeMensure) {
      url += '?typeMensure' + typeMensure;
    }
    return this._httpClient.get<ISupplementsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((supplementsResponse) => supplementsResponse.values as SupplementsList),
      catchError(handleError)
    );
  }

  getSupplement(idSupplement: number): Observable<ISupplement | undefined> {
    let url = API_URL + 'supplement/' + idSupplement;
    return this._httpClient.get<ISupplementsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((supplementsResponse) => supplementsResponse.values as ISupplement),
      catchError(handleError)
    );
  }

  postSupplement(objSupplement: ISupplement): Observable<ISupplementsResponse> {
    let url = API_URL + 'supplement';
    return this._httpClient.post<ISupplementsResponse>(url, objSupplement, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((supplementsResponse) => supplementsResponse),
      catchError(handleError)
    );
  }

  putSupplement(idSupplement: number, objSupplement: ISupplement): Observable<ISupplementsResponse> {
    let url = API_URL + 'supplement/' + idSupplement;
    return this._httpClient.put<ISupplementsResponse>(url, objSupplement, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((supplementsResponse) => supplementsResponse),
      catchError(handleError)
    );
  }

  deleteSupplement(idSupplement: number): Observable<ISupplementsResponse> {
    let url = API_URL + 'supplement/' + idSupplement;
    return this._httpClient.delete<ISupplementsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((supplementsResponse) => supplementsResponse),
      catchError(handleError)
    );
  }
}
