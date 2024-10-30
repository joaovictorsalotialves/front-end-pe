import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ISupplement } from '../interfaces/supplements-response/supplement.interface';
import { ISupplementsResponse } from '../interfaces/supplements-response/supplements-response.interface';
import { SupplementsList } from '../types/supplements-list';
import { API_URL } from '../utils/api-url';

@Injectable({
  providedIn: 'root'
})
export class SupplementsService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  getSupplements(
    nameSupplement: string | undefined = undefined, nameSupplementCategory: string | undefined = undefined,
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
    return this._httpClient.get<ISupplementsResponse>(url).pipe(
      map((supplementsResponse) => supplementsResponse.values)
    );
  }

  getSupplement(idSupplement: number): Observable<SupplementsList | undefined> {
    let url = API_URL + 'supplement/' + idSupplement;
    return this._httpClient.get<ISupplementsResponse>(url).pipe(
      map((supplementsResponse) => supplementsResponse.values)
    );
  }

  postSupplement(objSupplement: ISupplement): Observable<ISupplementsResponse> {
    let url = API_URL + 'supplement';
    return this._httpClient.post<ISupplementsResponse>(url, objSupplement).pipe(
      map((supplementsResponse) => supplementsResponse)
    );
  }

  putSupplement(idSupplement: number, objSupplement: ISupplement): Observable<ISupplementsResponse> {
    let url = API_URL + 'supplement/' + idSupplement;
    return this._httpClient.put<ISupplementsResponse>(url, objSupplement).pipe(
      map((supplementsResponse) => supplementsResponse)
    );
  }

  deleteSupplement(idSupplement: number): Observable<ISupplementsResponse> {
    let url = API_URL + 'supplement/' + idSupplement;
    return this._httpClient.delete<ISupplementsResponse>(url).pipe(
      map((supplementsResponse) => supplementsResponse)
    );
  }
}
