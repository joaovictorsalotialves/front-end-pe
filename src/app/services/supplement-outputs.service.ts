import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { ISupplementOutputRequest } from '../interfaces/supplement-outputs/supplement-output-request.interface';
import { ISupplementOutput } from '../interfaces/supplement-outputs/supplement-output.interface';
import { ISupplementOutputsResponse } from '../interfaces/supplement-outputs/supplement-outputs-response';
import { SupplementOutputsList } from '../types/supplement-outputs-list';
import { API_URL } from '../utils/api-url';
import { handleError } from '../utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class SupplementOutputsService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }
  authToken: string = localStorage.getItem('authToken') as string;

  getSupplementOutputs(
    nameSupplement: string | undefined = undefined, nameSupplementCategory: string | undefined = undefined,
    outputDate: string | undefined = undefined
  ): Observable<SupplementOutputsList | undefined> {
    let url = API_URL + 'supplement-output';
    if (nameSupplement) {
      url += '?nameSupplement=' + nameSupplement;
      if (nameSupplementCategory) url += '&nameSupplementCategory' + nameSupplementCategory;
      if (outputDate) url += '&outputDate' + outputDate;
    } else if (nameSupplementCategory) {
      url += '?nameSupplementCategory' + nameSupplementCategory;
      if (outputDate) url += '&outputDate' + outputDate;
    } else if (outputDate) {
      url += '?outputDate' + outputDate;
    }
    return this._httpClient.get<ISupplementOutputsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((supplementOutputsResponse) => supplementOutputsResponse.values as SupplementOutputsList),
      catchError(handleError)
    );
  }

  getSupplementOutput(idSupplementOutput: number): Observable<ISupplementOutput | undefined> {
    let url = API_URL + 'supplement-output/' + idSupplementOutput;
    return this._httpClient.get<ISupplementOutputsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((supplementOutputsResponse) => supplementOutputsResponse.values as ISupplementOutput),
      catchError(handleError)
    );
  }

  postSupplementOutput(objSupplementOutput: ISupplementOutputRequest): Observable<ISupplementOutputsResponse> {
    let url = API_URL + 'supplement-output';
    return this._httpClient.post<ISupplementOutputsResponse>(url, objSupplementOutput, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((supplementOutputsResponse) => supplementOutputsResponse),
      catchError(handleError)
    );
  }

  putSupplementOutput(idSupplementOutput: number, objSupplementOutput: ISupplementOutputRequest): Observable<ISupplementOutputsResponse> {
    let url = API_URL + 'supplement-output/' + idSupplementOutput;
    return this._httpClient.put<ISupplementOutputsResponse>(url, objSupplementOutput, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((supplementOutputsResponse) => supplementOutputsResponse),
      catchError(handleError)
    );
  }

  deleteSupplementOutput(idSupplementOutput: number): Observable<ISupplementOutputsResponse> {
    let url = API_URL + 'supplement-output/' + idSupplementOutput;
    return this._httpClient.delete<ISupplementOutputsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((supplementOutputsResponse) => supplementOutputsResponse),
      catchError(handleError)
    );
  }
}
