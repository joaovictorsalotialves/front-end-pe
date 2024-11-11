import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IRacesResponse } from '../interfaces/race-response/race-response.interface';
import { IRace } from '../interfaces/race-response/race.interface';
import { RacesList } from '../types/races-list';
import { API_URL } from '../utils/api-url';

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
      map((racesResponse) => racesResponse.values)
    );
  }

  getRace(idRace: number): Observable<RacesList | undefined> {
    let url = API_URL + 'race/' + idRace;
    return this._httpClient.get<IRacesResponse>(url).pipe(
      map((racesResponse) => racesResponse.values)
    );
  }

  postRace(objRace: IRace): Observable<IRacesResponse> {
    let url = API_URL + 'race/';
    return this._httpClient.post<IRacesResponse>(url, objRace).pipe(
      map((racesResponse) => racesResponse)
    );
  }

  putRace(idRace: number, objRace: IRace): Observable<IRacesResponse> {
    let url = API_URL + 'race/' + idRace;
    return this._httpClient.put<IRacesResponse>(url, objRace).pipe(
      map((racesResponse) => racesResponse)
    );
  }

  deleteRace(idRace: number): Observable<IRacesResponse> {
    let url = API_URL + 'race/' + idRace;
    return this._httpClient.delete<IRacesResponse>(url).pipe(
      map((racesResponse) => racesResponse)
    );
  }
}
