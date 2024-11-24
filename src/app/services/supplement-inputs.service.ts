import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { ISupplementInputRequest } from '../interfaces/supplement-inputs/supplement-input-request.interface';
import { ISupplementInput } from '../interfaces/supplement-inputs/supplement-input.interface';
import { ISupplementInputsResponse } from '../interfaces/supplement-inputs/supplement-inputs-response';
import { SupplementInputsList } from '../types/supplement-inputs-list';
import { API_URL } from '../utils/api-url';
import { handleError } from '../utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class SupplementInputsService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }
  authToken: string = localStorage.getItem('authToken') as string;

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
    return this._httpClient.get<ISupplementInputsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((supplementInputsResponse) => supplementInputsResponse.values as SupplementInputsList),
      catchError(handleError)
    );
  }

  getSupplementInput(idSupplementInput: number): Observable<ISupplementInput | undefined> {
    let url = API_URL + 'supplement-input/' + idSupplementInput;
    return this._httpClient.get<ISupplementInputsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((supplementsResponse) => supplementsResponse.values as ISupplementInput),
      catchError(handleError)
    );
  }

  postSupplementInput(objSupplementInput: ISupplementInputRequest): Observable<ISupplementInputsResponse> {
    let url = API_URL + 'supplement-input';
    return this._httpClient.post<ISupplementInputsResponse>(url, objSupplementInput, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((supplementInputsResponse) => supplementInputsResponse),
      catchError(handleError)
    );
  }

  putSupplementInput(idSupplementInput: number, objSupplementInput: ISupplementInputRequest): Observable<ISupplementInputsResponse> {
    let url = API_URL + 'supplement-input/' + idSupplementInput;
    return this._httpClient.put<ISupplementInputsResponse>(url, objSupplementInput, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((supplementInputsResponse) => supplementInputsResponse),
      catchError(handleError)
    );
  }

  deleteSupplementInput(idSupplementInput: number): Observable<ISupplementInputsResponse> {
    let url = API_URL + 'supplement-input/' + idSupplementInput;
    return this._httpClient.delete<ISupplementInputsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((supplementInputsResponse) => supplementInputsResponse),
      catchError(handleError)
    );
  }
}
