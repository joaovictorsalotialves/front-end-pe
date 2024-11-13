import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICitiesResponse } from '../interfaces/cities-response/cities-response.interface';
import { CitiesList } from '../types/cities-list';
import { API_URL } from '../utils/api-url';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }
  authToken: string = localStorage.getItem('authToken') as string;

  getCities(nameCity: undefined | string = undefined): Observable<CitiesList | undefined> {
    let url = API_URL + 'city';
    if (nameCity) url += '?nameCity=' + nameCity;
    return this._httpClient.get<ICitiesResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((statesResponse) => statesResponse.values)
    );
  }

  getCitiesForState(idState: number, nameCity: undefined | string = undefined): Observable<CitiesList | undefined> {
    let url = API_URL + 'city/state/' + idState;
    if (nameCity) url += '?nameCity=' + nameCity;
    return this._httpClient.get<ICitiesResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((statesResponse) => statesResponse.values)
    );
  }

  getCity(idCity: number): Observable<CitiesList | undefined> {
    return this._httpClient.get<ICitiesResponse>(API_URL + 'city/' + idCity, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((statesResponse) => statesResponse.values)
    );
  }
}
