import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IStatesResponse } from '../interfaces/states-response/states-response.interface';
import { StatesList } from '../types/states-list';
import { API_URL } from '../utils/api-url';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  getStates(nameState: string | undefined = undefined): Observable<StatesList | undefined> {
    let url = API_URL + 'state';
    if (nameState) url += '?nameState=' + nameState;
    return this._httpClient.get<IStatesResponse>(url).pipe(
      map((statesResponse) => statesResponse.values)
    );
  }

  getState(idState: number): Observable<StatesList | undefined> {
    let url = API_URL + 'state/' + idState;
    return this._httpClient.get<IStatesResponse>(url).pipe(
      map((statesResponse) => statesResponse.values)
    );
  }
}
