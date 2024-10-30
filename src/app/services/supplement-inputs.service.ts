import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ISupplementInput } from '../interfaces/supplement-inputs-response/supplement-input';
import { ISupplementInputsResponse } from '../interfaces/supplement-inputs-response/supplement-inputs-response';
import { SupplementInputsList } from '../types/supplement-inputs-list';
import { API_URL } from '../utils/api-url';

@Injectable({
  providedIn: 'root'
})
export class SupplementInputsService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  getSupplementInputs(
    nameSupplement: string | undefined = undefined, nameSupplementCategory: string | undefined = undefined,
    inputDate: string | undefined = undefined
  ): Observable<SupplementInputsList | undefined> {
    let url = API_URL + 'supplement-input';
    if (nameSupplement) {
      url += '?nameSupplement=' + nameSupplement;
      if (nameSupplementCategory) url += '&nameSupplementCategory' + nameSupplementCategory;
      if (inputDate) url += '&inputDate' + inputDate;
    } else if (nameSupplementCategory) {
      url += '?nameSupplementCategory' + nameSupplementCategory;
      if (inputDate) url += '&inputDate' + inputDate;
    } else if (inputDate) {
      url += '?inputDate' + inputDate;
    }
    return this._httpClient.get<ISupplementInputsResponse>(url).pipe(
      map((supplementInputsResponse) => supplementInputsResponse.values)
    );
  }

  getSupplementInput(idSupplementInput: number): Observable<SupplementInputsList | undefined> {
    let url = API_URL + 'supplement-input/' + idSupplementInput;
    return this._httpClient.get<ISupplementInputsResponse>(url).pipe(
      map((supplementsResponse) => supplementsResponse.values)
    );
  }

  postSupplementInput(objSupplementInput: ISupplementInput): Observable<ISupplementInputsResponse> {
    let url = API_URL + 'supplement-input';
    return this._httpClient.post<ISupplementInputsResponse>(url, objSupplementInput).pipe(
      map((supplementInputsResponse) => supplementInputsResponse)
    );
  }

  putSupplementInput(idSupplementInput: number, objSupplementInput: ISupplementInput): Observable<ISupplementInputsResponse> {
    let url = API_URL + 'supplement-input/' + idSupplementInput;
    return this._httpClient.put<ISupplementInputsResponse>(url, objSupplementInput).pipe(
      map((supplementInputsResponse) => supplementInputsResponse)
    );
  }

  deleteSupplementInput(idSupplementInput: number): Observable<ISupplementInputsResponse> {
    let url = API_URL + 'supplement-input/' + idSupplementInput;
    return this._httpClient.delete<ISupplementInputsResponse>(url).pipe(
      map((supplementInputsResponse) => supplementInputsResponse)
    );
  }
}
