import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ISupplementOutput } from '../interfaces/supplement-outputs-response/supplement-output';
import { ISupplementOutputsResponse } from '../interfaces/supplement-outputs-response/supplement-outputs-response';
import { SupplementOutputsList } from '../types/supplement-outputs-list';
import { API_URL } from '../utils/api-url';

@Injectable({
  providedIn: 'root'
})
export class SupplementOutputsService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

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
    return this._httpClient.get<ISupplementOutputsResponse>(url).pipe(
      map((supplementOutputsResponse) => supplementOutputsResponse.values)
    );
  }

  getSupplementOutput(idSupplementOutput: number): Observable<SupplementOutputsList | undefined> {
    let url = API_URL + 'supplement-output/' + idSupplementOutput;
    return this._httpClient.get<ISupplementOutputsResponse>(url).pipe(
      map((supplementOutputsResponse) => supplementOutputsResponse.values)
    );
  }

  postSupplementOutput(objSupplementOutput: ISupplementOutput): Observable<ISupplementOutputsResponse> {
    let url = API_URL + 'supplement-output';
    return this._httpClient.post<ISupplementOutputsResponse>(url, objSupplementOutput).pipe(
      map((supplementOutputsResponse) => supplementOutputsResponse)
    );
  }

  putSupplementOutput(idSupplementOutput: number, objSupplementOutput: ISupplementOutput): Observable<ISupplementOutputsResponse> {
    let url = API_URL + 'supplement-output/' + idSupplementOutput;
    return this._httpClient.put<ISupplementOutputsResponse>(url, objSupplementOutput).pipe(
      map((supplementOutputsResponse) => supplementOutputsResponse)
    );
  }

  deleteSupplementOutput(idSupplementOutput: number): Observable<ISupplementOutputsResponse> {
    let url = API_URL + 'supplement-output/' + idSupplementOutput;
    return this._httpClient.delete<ISupplementOutputsResponse>(url).pipe(
      map((supplementOutputsResponse) => supplementOutputsResponse)
    );
  }
}
