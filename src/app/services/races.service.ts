import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { IRaceRequest } from '../interfaces/race/race-request.interface';
import { IRacesResponse } from '../interfaces/race/race-response.interface';
import { IRace } from '../interfaces/race/race.interface';
import { RacesList } from '../types/races-list';
import { API_URL } from '../utils/api-url';
import { handleError } from '../utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class RacesService {
  authToken: string = localStorage.getItem('authToken') as string;

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  getRaces(nameRace: string | undefined = undefined): Observable<RacesList | undefined> {
    let url = API_URL + 'race';
    if (nameRace) url += '?nameRace=' + nameRace;
    return this._httpClient.get<IRacesResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((racesResponse) => racesResponse.values as RacesList),
      catchError(handleError)
    );
  }

  getRace(idRace: number): Observable<IRace | undefined> {
    let url = API_URL + 'race/' + idRace;
    return this._httpClient.get<IRacesResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((racesResponse) => racesResponse.values as IRace),
      catchError(handleError)
    );
  }

  postRace(objRace: IRaceRequest): Observable<IRacesResponse> {
    let url = API_URL + 'race/';
    return this._httpClient.post<IRacesResponse>(url, objRace, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((racesResponse) => racesResponse),
      catchError(handleError)
    );
  }

  putRace(idRace: number, objRace: IRaceRequest): Observable<IRacesResponse> {
    let url = API_URL + 'race/' + idRace;
    return this._httpClient.put<IRacesResponse>(url, objRace, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((racesResponse) => racesResponse),
      catchError(handleError)
    );
  }

  deleteRace(idRace: number): Observable<IRacesResponse> {
    let url = API_URL + 'race/' + idRace;
    return this._httpClient.delete<IRacesResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((racesResponse) => racesResponse),
      catchError(handleError)
    );
  }
}
