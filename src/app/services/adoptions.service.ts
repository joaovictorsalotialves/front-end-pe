import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { IAdoptionRequest } from '../interfaces/adoptions/adoption-request.interface';
import { IAdoptionsResponse } from '../interfaces/adoptions/adoptions-response.interface';
import { AdoptionsList } from '../types/adoptions-list';
import { API_URL } from '../utils/api-url';
import { handleError } from '../utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class AdoptionsService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }
  authToken: string = localStorage.getItem('authToken') as string;

  getAdoptions(
    nameUser: string | undefined = undefined, nameAnimal: string | undefined = undefined,
    dateAdoption: string | undefined = undefined
  ): Observable<AdoptionsList | undefined> {
    let url = API_URL + 'adoption';
    if (nameUser) {
      url += '?nameUser=' + nameUser;
      if (nameAnimal) url += '&nameAnimal=' + nameAnimal;
      if (dateAdoption) url += '&dateAdoption=' + dateAdoption;
    } else if (nameAnimal) {
      url += '?nameAnimal=' + nameAnimal;
      if (dateAdoption) url += '&dateAdoption=' + dateAdoption;
    } else if (dateAdoption) url += '?dateAdoption=' + dateAdoption;
    return this._httpClient.get<IAdoptionsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((adoptionsResponse) => adoptionsResponse.values),
      catchError(handleError)
    );
  }

  getAdoption(idAdoption: number): Observable<AdoptionsList | undefined> {
    let url = API_URL + 'adoption/' + idAdoption;
    return this._httpClient.get<IAdoptionsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((adoptionsResponse) => adoptionsResponse.values),
      catchError(handleError)
    );
  }

  postAdoption(objAdoption: IAdoptionRequest): Observable<IAdoptionsResponse> {
    let url = API_URL + 'adoption/';
    return this._httpClient.post<IAdoptionsResponse>(url, objAdoption, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((adoptionsResponse) => adoptionsResponse),
      catchError(handleError)
    );
  }

  putAdoption(idAdoption: number, objAdoption: IAdoptionRequest): Observable<IAdoptionsResponse> {
    let url = API_URL + 'adoption/' + idAdoption;
    return this._httpClient.put<IAdoptionsResponse>(url, objAdoption, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((adoptionsResponse) => adoptionsResponse),
      catchError(handleError)
    );
  }

  patchAdoptionStatus(idAdoption: number, statusAdoption: string): Observable<IAdoptionsResponse> {
    let url = API_URL + 'adoption/' + idAdoption;
    return this._httpClient.patch<IAdoptionsResponse>(url, { statusAdoption: statusAdoption }, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((adoptionsResponse) => adoptionsResponse),
      catchError(handleError)
    );
  }

  deleteAdoption(idAdoption: number): Observable<IAdoptionsResponse> {
    let url = API_URL + 'adoption/' + idAdoption;
    return this._httpClient.delete<IAdoptionsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((adoptionsResponse) => adoptionsResponse),
      catchError(handleError)
    );
  }
}
