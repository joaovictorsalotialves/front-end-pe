import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAdoption } from '../interfaces/adoptions-response/adoption.interface';
import { IAdoptionsResponse } from '../interfaces/adoptions-response/adoptions-response.interface';
import { AdoptionsList } from '../types/adoptions-list';
import { API_URL } from '../utils/api-url';

@Injectable({
  providedIn: 'root'
})
export class AdoptionsService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

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
    } else if (dateAdoption) url += '&dateAdoption=' + dateAdoption;
    return this._httpClient.get<IAdoptionsResponse>(url).pipe(
      map((adoptionsResponse) => adoptionsResponse.values)
    );
  }

  getAdoption(idAdoption: number): Observable<AdoptionsList | undefined> {
    let url = API_URL + 'adoption/' + idAdoption;
    return this._httpClient.get<IAdoptionsResponse>(url).pipe(
      map((adoptionsResponse) => adoptionsResponse.values)
    );
  }

  postAdoption(objAdoption: IAdoption): Observable<IAdoptionsResponse> {
    let url = API_URL + 'adoption/';
    return this._httpClient.post<IAdoptionsResponse>(url, objAdoption).pipe(
      map((adoptionsResponse) => adoptionsResponse)
    );
  }

  putAdoption(idAdoption: number, objAdoption: IAdoption): Observable<IAdoptionsResponse> {
    let url = API_URL + 'adoption/' + idAdoption;
    return this._httpClient.put<IAdoptionsResponse>(url, objAdoption).pipe(
      map((adoptionsResponse) => adoptionsResponse)
    );
  }

  patchAdoptionStatus(idAdoption: number, statusAdoption: string): Observable<IAdoptionsResponse> {
    let url = API_URL + 'adoption/' + idAdoption;
    return this._httpClient.patch<IAdoptionsResponse>(url, { statusAdoption: statusAdoption }).pipe(
      map((adoptionsResponse) => adoptionsResponse)
    );
  }

  deleteAdoption(idAdoption: number): Observable<IAdoptionsResponse> {
    let url = API_URL + 'adoption/' + idAdoption;
    return this._httpClient.delete<IAdoptionsResponse>(url).pipe(
      map((adoptionsResponse) => adoptionsResponse)
    );
  }
}
